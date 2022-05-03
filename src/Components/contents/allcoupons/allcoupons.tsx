import { Box, Container, Grid, Typography } from "@mui/material";
import Coupon from "../../cards/Coupon/Coupon";
import "./allcoupons.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CouponModel } from "../../../Modals/CouponModel";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

function Allcoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/guest/getAllCoupons").then((response) => {
      console.log(response.data);
      setCoupons(response.data);
    });
  }, []);

  const state = useTypedSelector((state) => state);
  console.log(state);

  console.log(localStorage.getItem("token"));

  return (
    <Box paddingY={3}>
      <Container>
        <Grid container spacing={5}>
          {coupons.map((c) => (
            <Coupon coupon={c} key={c.id} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
//
////

export default Allcoupons;
