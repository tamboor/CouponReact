import { Button, Grid, Paper, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import getAuthHeaders, { getStoredToken } from "../../../../utils/tokenUtils";
import CartCoupon from "../../../cards/CartCoupon/CartCoupon";
import "./Cart.css";

const styles = {
  backgroundColor: "#FFB6C1",
  height: "100vh",
};

//TODO: move cart to external file
function Cart(): JSX.Element {
  const { clearCart, removeItem } = useActions();

  const state = useTypedSelector((state) => state);

  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePurchase = async () => {
    setIsProcessing(true);
    const cart = state.users.cart;
    cart.forEach(async (c) => await checkCouponAndBuy(c));
    setIsProcessing(false);
  };

  const errorCallback = (e: AxiosError) => {
    console.log(e);
  };

  //TODO: place token after request
  //todo: change error callback to bigger scoped
  function checkCouponAndBuy(coupon: CouponModel) {
    axios
      .get(
        `http://localhost:8080/customer/checkCoupon/${coupon.id}`,
        getAuthHeaders()
      )
      .then((res) => {
        axios
          .post(
            "http://localhost:8080/customer/newPurchase",
            { ...coupon },
            {
              headers: { Authorization: getStoredToken() },
            }
          )
          .then((res) => {
            removeItem(coupon);
          })
          .catch((err: AxiosError) => {
            errorCallback(err);
          });
      })
      .catch((error) => {
        //TODO: make better 401 response in backend
        errorCallback(error);
      });
  }

  //TODO: CART DOESNT SEND PURCHASE REQUEST!
  return (
    <div className="CouponPurchase">
      <Button onClick={clearCart} disabled={isProcessing}>
        Clear Cart
      </Button>
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
          <Paper elevation={2}>
            <Button onClick={handlePurchase} disabled={isProcessing}>
              Purchase
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
