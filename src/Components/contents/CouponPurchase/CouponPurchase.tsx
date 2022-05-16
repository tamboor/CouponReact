import { Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { json } from "stream/consumers";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { clearCart } from "../../../Redux/action-creators";

import { CouponModel } from "../../../Models/CouponModel";
import CartCoupon from "../../cards/CartCoupon/CartCoupon";
import getAuthHeaders, { getStoredToken } from "../../utils/tokenUtils";
import "./CouponPurchase.css";

const styles = {
  backgroundColor: "#FFB6C1",
  height: "100vh",
};
//TODO: move cart to external file
function CouponPurchase(): JSX.Element {
  const { clearCart } = useActions();

  const state = useTypedSelector((state) => state);

  console.log(state);

  const stateCoupons = state.users.cart;
  const coupons = stateCoupons.filter(function (
    item: CouponModel,
    pos: number
  ) {
    return stateCoupons.indexOf(item) == pos;
  });

  const getSubTotal = () => {
    let total = 0;
    coupons.forEach((coupon) => {
      total += coupon.price;
    });
    return total;
  };

  return (
    <div className="CouponPurchase">
      <Button onClick={clearCart}>Clear Cart</Button>
      <Grid container spacing={3}>
        <Grid item xs={9} sx={styles}>
          {coupons.map((c: CouponModel, index: number) => (
            <CartCoupon coupon={c} key={index} />
          ))}
        </Grid>
        <Grid item xs={3} sx={styles}>
          <Paper elevation={2}>
            <Typography variant="h4">Subtotal:</Typography>
            <Typography variant="h4">{getSubTotal()}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default CouponPurchase;
