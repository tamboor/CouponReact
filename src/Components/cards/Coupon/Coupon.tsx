import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Coupon.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CouponModel } from "../../../Models/CouponModel";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CouponMenu from "../../views/header-content/CouponMenu/CouponMenu";
import { useState } from "react";
import { addItem } from "../../../Redux/action-creators";
import { useActions } from "../../../hooks/useActions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CouponForm from "../../forms/CouponForm/CouponForm";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
// interface couponProps {
//   amount: number;
//   category: string;
//   description: string;
//   endDate: number;
//   id: number;
//   image: string;
//   price: number;
//   startDate: number;
//   title: string;
// }
interface couponProps {
  coupon: CouponModel;
  isPurchased: boolean;
}

function Coupon(props: couponProps): JSX.Element {
  const { addItem } = useActions();

  const state = useTypedSelector((state) => state);

  // console.log("type from coupon: " + typeof state.users.cart);

  const handleAddToCart = (event: any) => {
    addItem(props.coupon);
  };

  const handleEditCoupon = (event: any) => {
    return <CouponForm verb={AdminVerbs.UPDATE} coupon={props.coupon} />;
  };

  console.log(state.users.cart.includes(props.coupon));

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return (
          <Button
            onClick={handleAddToCart}
            disabled={state.users.cart.includes(props.coupon)}
          >
            Add to cart
          </Button>
        );
      case "company":
        return <Button onClick={handleEditCoupon}>Edit</Button>;
    }
  }

  return (
    //TODO: move gridItem to showCoupons
    <Grid item xs={3}>
      <Paper elevation={12}>
        <img
          src="https://m.gagam.co.il/wp-content/uploads/2017/10/מגנה-הדפסת-תמונה-על-מגנט-תמונות-על-מגנט-2.jpg"
          // src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cts.co.il%2F%25D7%25A2%25D7%2595%25D7%25A8-%25D7%25A9%25D7%259C-%25D7%25AA%25D7%2599%25D7%25A0%25D7%2595%25D7%25A7&psig=AOvVaw127pnbUsRBAAD3uQEurCJv&ust=1653318941890000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPibvpSz8_cCFQAAAAAdAAAAABAN"
          alt=""
          className="img"
        />
        <Box paddingX={2} paddingY={1}>
          <Typography variant="h6" component="h6">
            {props.coupon.category}
          </Typography>
          <Typography variant="h4" component="h2">
            {props.coupon.title}
          </Typography>
          <Typography variant="h4" component="h2">
            {props.coupon.price}
            <AttachMoneyIcon
              sx={{
                width: "2rem",
                marginRight: 0.5,
              }}
            />
          </Typography>
          <Typography variant="h6" component="h2">
            {props.coupon.description}
          </Typography>
          {/* <Box> */}
          <Typography variant="h6" component="p">
            <EventAvailableIcon
              sx={{
                width: "2rem",
                marginRight: 0.5,
              }}
            />
            {props.coupon.startDate}
          </Typography>
          <Typography variant="h6" component="p">
            <EventBusyIcon
              sx={{
                width: "2rem",
                marginRight: 0.5,
              }}
            />
            {props.coupon.endDate}
          </Typography>
          {/* </Box> */}
          <Typography variant="h6" component="p">
            <Inventory2OutlinedIcon
              sx={{
                width: "2rem",
                marginRight: 0.5,
              }}
            />
            {props.coupon.amount}
          </Typography>
          {renderSwitch()}
        </Box>
      </Paper>
    </Grid>
  );
}

export default Coupon;
//
