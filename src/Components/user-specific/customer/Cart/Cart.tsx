import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import { host } from "../../../../utils/globals";
import notify from "../../../../utils/Notify";
import getAuthHeaders, {
  getStoredToken,
  setStoredToken,
} from "../../../../utils/tokenUtils";
import CartCoupon from "../../../cards/CartCoupon/CartCoupon";
import "./Cart.css";

const styles = {
  backgroundColor: "#FFB6C1",
  height: "100vh",
};

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

  function checkCouponAndBuy(coupon: CouponModel) {
    axios
      .get(`${host}/customer/checkCoupon/${coupon.id}`, getAuthHeaders())
      .then((res) => {
        axios
          .post(
            `${host}/customer/newPurchase`,
            { ...coupon },
            {
              headers: { Authorization: getStoredToken() },
            }
          )
          .then((res) => {
            removeItem(coupon);
            notify.success(coupon.title + " was successfully purchased");
          })
          .catch((err: any) => {
            notify.error(err.response.data.description);
            errorCallback(err);
          });
      })
      .catch((error) => {
        //TODO: make better 401 response in backend
        errorCallback(error);
      });
  }

  return (
    <Box>
      <br />
      <br />
      <br />

      <Container>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Box sx={{ alignContent: "flex-end", flexGrow: 1 }}>
              <Button onClick={clearCart} disabled={isProcessing}>
                Clear Cart
              </Button>
            </Box>
            <Box sx={{ alignContent: "flex-end", flexGrow: 1 }}>
              {/* <Grid item xs={3} sx={styles}> */}
              <Paper elevation={2}>
                <Typography variant="h4">Subtotal:</Typography>
                <Typography variant="h4">{getSubTotal()}</Typography>
              </Paper>
              <Paper elevation={2}>
                <Button onClick={handlePurchase} disabled={isProcessing}>
                  Purchase
                </Button>
              </Paper>
              {/* </Grid> */}
            </Box>
          </Box>

          <Box>
            <Grid container spacing={3}>
              {/* <Grid item xs={9} sx={styles}> */}
              <Grid container spacing={5} marginTop={0.005}>
                {coupons.map((c: CouponModel, index: number) => (
                  <CartCoupon coupon={c} key={index} />
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>

    // </div>
  );
}

export default Cart;
