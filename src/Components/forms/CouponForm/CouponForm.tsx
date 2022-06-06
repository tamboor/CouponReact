import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Card,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios, { AxiosResponse, AxiosError } from "axios";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../hooks/useActions";
import { CouponModel } from "../../../Models/CouponModel";
import { refetchCoupons } from "../../../utils/fetchCompanyCoupons";
import globals, { host } from "../../../utils/globals";
import notify from "../../../utils/Notify";

import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
import "./CouponForm.css";
interface CouponFormProps {
  verb: AdminVerbs;
  coupon?: CouponModel;
  handleClose: Function;
  updateFunction?: Function;
  addFunction?: Function;
}

interface CouponForm {
  id: number;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

function CouponForm(props: CouponFormProps): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CouponForm>();

  const [category, setCategory] = React.useState(
    props.coupon ? props.coupon.category : ""
  );

  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const onError = (errors: any, e: any) => {};

  const useSubmit: SubmitHandler<CouponForm> = async (data) => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        const addStartDateFormat = (startDate as Date)
          .toJSON()
          .substring(0, 10);
        const addEndDateFormat = (endDate as Date).toJSON().substring(0, 10);
        const addData = {
          ...data,
          id: 0,
          startDate: addStartDateFormat,
          endDate: addEndDateFormat,
        };
        console.log(addData);

        axios
          .post(`${host}/company/addCoupon`, addData, getAuthHeaders())
          .then((res: AxiosResponse) => {
            console.log(res.request);
            setStoredToken(res);
            props.handleClose();

            refetchCoupons();
          })
          .catch((error: any) => {
            //TODO: handle error
            console.log(error);
            notify.error(error.response?.data.description as string);
          });
        break;
      case AdminVerbs.UPDATE:
        const updateStartDateFormat = (startDate as Date)
          .toJSON()
          .substring(0, 10);
        const updateEndDateFormat = (endDate as Date).toJSON().substring(0, 10);
        const updateData = {
          ...data,
          startDate: updateStartDateFormat,
          endDate: updateEndDateFormat,
        };
        axios
          .put(
            `${host}/company/addCoupon`,
            { ...props.coupon, ...updateData },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
            props.handleClose();
            notify.success("Coupon Updated!");

            refetchCoupons();
          })
          .catch((error: AxiosError) => {
            //TODO: handle error
            console.log(error);

            notify.error(error.response?.data as string);
          });
        break;
    }
  };

  return (
    <div className="CouponForm">
      <Grid item>
        <Card elevation={12} sx={{ display: "flow", flexDirection: "column" }}>
          <form onSubmit={handleSubmit(useSubmit, onError)}>
            <Box paddingX={2} paddingY={1}>
              <TextField
                {...register("image", { required: "this is required" })}
                required
                label="Image URL"
                type="url"
                variant="outlined"
                defaultValue={props.coupon?.image}
              />
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                required
                {...register("category", { required: "this is required" })}
                labelId="category-select"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChange}
                sx={{ width: 1 }}
              >
                <MenuItem value={"xtreme"}>Xtreme</MenuItem>
                <MenuItem value={"tattoos"}>Tattoos</MenuItem>
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"cars"}>Cars</MenuItem>
                <MenuItem value={"vacation"}>Vacation</MenuItem>
              </Select>
              <br /> <br />
              <TextField
                {...register("title", { required: errors.title?.message })}
                required
                label="Title"
                variant="outlined"
                defaultValue={props.coupon?.title}
                helperText={errors.title && errors.title.message}
              />
              <br />
              <br />
              <TextField
                {...register("price", { required: "this is required" })}
                required
                id="price"
                label="Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={props.coupon?.price}
              />
              <br />
              <br />
              <TextField
                {...register("description", { required: "this is required" })}
                required
                label="Description"
                variant="outlined"
                defaultValue={props.coupon?.description}
              />
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newDate) => {
                    setStartDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newDate) => {
                    setEndDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br />
              <br />
              <TextField
                {...register("amount", { required: "this is required" })}
                required
                id="amount"
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={props.coupon?.amount}
              />
            </Box>
            <Button onClick={(data: any) => props.handleClose()}>Cancel</Button>
            <Button type="submit">{props.verb}</Button>
          </form>
        </Card>
      </Grid>
    </div>
  );
}

export default CouponForm;
