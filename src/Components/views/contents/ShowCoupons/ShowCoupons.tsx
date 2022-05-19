import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Menu,
  Slider,
  TextField,
} from "@mui/material";
import "./ShowCoupons.css";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import React, { useState, useEffect } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import getAuthHeaders from "../../../../utils/tokenUtils";
import Coupon from "../../../cards/Coupon/Coupon";
import AddCoupon from "../../../cards/AddCoupon/AddCoupon";

//TODO: change filtering to work on limited amount of coupons (use custom hooks)
//TODO: change to category enum
//TODO: handle searchbar
interface CouponsState {
  coupons: CouponModel[];
  couponsFiltered: CouponModel[];
  categories: {
    xtreme: boolean;
    tattoos: boolean;
    food: boolean;
    vacation: boolean;
    cars: boolean;
  };
  valueRange: number[];
}

function ShowCoupons(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showState, setShowState] = useState<CouponsState>({
    coupons: [],
    couponsFiltered: [],
    categories: {
      xtreme: true,
      tattoos: true,
      food: true,
      vacation: true,
      cars: true,
    },
    valueRange: [0, 500],
  });
  const open = Boolean(anchorEl);

  const priceFilter = (allCoupons: CouponModel[]) => {
    return allCoupons.filter(
      (c: CouponModel) =>
        c.price >= showState.valueRange[0] && c.price <= showState.valueRange[1]
    );
  };
  const categoryFilter = (allCoupons: CouponModel[]) => {
    return allCoupons.filter((c: CouponModel) => {
      return showState.categories[
        c.category as keyof typeof showState.categories
      ];
    });
  };

  const allFilters = [priceFilter, categoryFilter];

  const handleChange = (event: Event, newValue: number | number[]) => {
    let workCoupons = showState.coupons;

    allFilters.forEach((filt) => {
      workCoupons = filt(workCoupons);
    });
    setShowState({
      ...showState,
      couponsFiltered: workCoupons,
      valueRange: newValue as number[],
    });
  };

  // console.log(state);

  //TODO: combine all handleChange
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let workCoupons = showState.coupons;

    showState.categories[
      event.target.name as keyof typeof showState.categories
    ] = event.target.checked;

    allFilters.forEach((filt) => {
      workCoupons = filt(workCoupons);
    });
    setShowState({
      ...showState,
      couponsFiltered: workCoupons,
    });
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  //TODO: handle any
  function fetchCoupons(): void {
    console.log("fetching coupons");
    axios
      .get(
        state.users.userRole === "company"
          ? "http://localhost:8080/company/getCompanyCoupons"
          : "http://localhost:8080/guest/getAllCoupons",
        getAuthHeaders()
      )
      .then((response) => {
        // console.log(response.data);
        setShowState({
          ...showState,
          coupons: response.data,
          couponsFiltered: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //TODO: make 'add coupon' card children props

  useEffect(() => {
    console.log("useEffect");
    fetchCoupons();
  }, [state.users.userRole]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let userCoupons: number[] = [];
  if (state.users.userRole == "customer") {
    axios
      .get(
        "http://localhost:8080/customer/getCustomerCoupons",
        getAuthHeaders()
      )
      .then((res: AxiosResponse) => {
        userCoupons = res.data.map((c: CouponModel) => c.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box paddingY={3}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={handleClick}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
          >
            Refine
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel>Categories</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="xtreme"
                      defaultChecked={true}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Xtreme"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="tattoos"
                      defaultChecked={true}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Tatoos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="food"
                      defaultChecked={true}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Food"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="vacation"
                      defaultChecked={true}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Vacations"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="cars"
                      defaultChecked={true}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Cars"
                />
              </FormGroup>
              <br />
              <FormLabel>Price Range</FormLabel>
              <Box sx={{ width: 300 }}>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={showState.valueRange}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={500}
                />
              </Box>
            </FormControl>
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </Box>
        <Grid container spacing={5} marginTop={0.005}>
          {state.users.userRole === "company" && (
            <Grid item xs={3}>
              <AddCoupon />
            </Grid>
          )}

          {state.users.userRole === "customer"
            ? showState.couponsFiltered.map((c) => (
                <Coupon
                  coupon={c}
                  isPurchased={userCoupons.includes(c.id)}
                  key={c.id}
                />
              ))
            : showState.couponsFiltered.map((c) => (
                <Coupon coupon={c} isPurchased={false} key={c.id} />
              ))}
        </Grid>
      </Container>
    </Box>
  );
}
export default ShowCoupons;
