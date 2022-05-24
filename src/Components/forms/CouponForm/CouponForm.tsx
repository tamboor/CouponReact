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
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios, { AxiosResponse, AxiosError } from "axios";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../hooks/useActions";
import { CouponModel } from "../../../Models/CouponModel";
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
  const { addCoupon } = useActions();

  const {
    register,
    formState: { errors },
    handleSubmit,
    // getValues,
    // control,
  } = useForm<CouponForm>();

  const [category, setCategory] = React.useState(
    props.coupon ? props.coupon.category : ""
  );

  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  // const [isError, setIsError] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const onError = (errors: any, e: any) => {
    // console.log(errors);
    // setIsError(true);
  };

  const useSubmit: SubmitHandler<CouponForm> = async (data) => {
    // console.log(startDate);
    // const addCouponToRedux = (coupon: CouponModel) => {
    //   addCoupon(coupon);
    // }

    switch (props.verb) {
      case AdminVerbs.ADD:
        const startDateFormat = (startDate as Date).toJSON().substring(0, 10);
        // const startDateFormat = (startDate as Date).toJSON();
        const endDateFormat = (endDate as Date).toJSON().substring(0, 10);
        // const endDateFormat = (endDate as Date).toJSON();
        const newData = {
          ...data,
          id: 0,
          startDate: startDateFormat,
          endDate: endDateFormat,
        };

        axios
          .post(
            `http://localhost:8080/company/addCoupon`,
            newData,
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
            props.handleClose();
            // props.addFunction?.({ ...data });
            addCoupon({
              ...newData,
              startDate: startDate ? startDate.getDate() : new Date().getDate(),
              endDate: endDate ? endDate.getDate() : new Date().getDate(),
            });
          })
          .catch((error: any) => {
            console.log(error);
            // notify.error(error.response?.data.description as string);
            // notify.error("fuck you");
            notify.error(error.response?.data.description as string);
          });
        break;
      case AdminVerbs.UPDATE:
        axios
          .put(
            `http://localhost:8080/company/updateCoupon`,
            { ...props.coupon, ...data },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
            props.handleClose();
            notify.success("Coupon Updated!");
            props.updateFunction && props.updateFunction(data);
          })
          .catch((error: AxiosError) => {
            console.log(error);

            notify.error(error.response?.data as string);
          });
        break;
    }
  };

  return (
    <div className="CouponForm">
      <Grid>
        <Paper elevation={12}>
          <form onSubmit={handleSubmit(useSubmit, onError)}>
            <Box paddingX={2} paddingY={1}>
              <TextField
                {...register("image", { required: "this is required" })}
                required
                // error={errors.image ? true : false}
                // error={isError}
                label="Image URL"
                type="url"
                variant="outlined"
                defaultValue={props.coupon?.image}
              />
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                required
                {...register("category", { required: "this is required" })}
                // error={errors.category ? true : false}
                labelId="category-select"
                id="category-select"
                // defaultValue={props.coupon?.category}
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
              {/* </FormControl> */}
              <TextField
                {...register("title", { required: errors.title?.message })}
                required
                // error={errors.title ? true : false}
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
                // error={errors.price ? true : false}
                // error={isError}
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
              {/* <Box> */}
              {/* </Box> */}
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
              {/* {renderSwitch()} */}
            </Box>
            <Button onClick={(data: any) => props.handleClose()}>Cancel</Button>
            <Button type="submit">{props.verb}</Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default CouponForm;
