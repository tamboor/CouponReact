import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Coupon.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CouponModel } from "../../../Models/CouponModel";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CouponMenu from "../../header-content/CouponMenu/CouponMenu";
import { useState } from "react";
import { addItem } from "../../../Redux/action-creators";
import { useActions } from "../../../hooks/useActions";

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
        return <Button>Edit</Button>;
    }
  }

  return (
    <Grid item xs={3}>
      <Paper elevation={12}>
        <img
          src="https://m.gagam.co.il/wp-content/uploads/2017/10/מגנה-הדפסת-תמונה-על-מגנט-תמונות-על-מגנט-2.jpg"
          alt=""
          className="img"
        />
        <Box paddingX={2} paddingY={1}>
          <Typography variant="h4" component="h2">
            {props.coupon.title}
          </Typography>
          <Box>
            <Typography variant="h5" component="p">
              <CalendarMonthIcon
                sx={{
                  width: "2rem",
                  marginRight: 0.5,
                }}
              />
              Date
            </Typography>
            <Typography variant="h6" component="h2">
              {props.coupon.description}
            </Typography>
          </Box>
          {renderSwitch()}
        </Box>
      </Paper>
    </Grid>
  );
}

export default Coupon;
//
