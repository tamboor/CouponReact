import { Box, Container, Grid, Typography } from "@mui/material";
import Coupon from "../../cards/Coupon/Coupon";
import "./allcoupons.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CouponModel } from "../../../Modals/CouponModel";

function Allcoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  // const getCoupons = async () => {
  //   const url = "http://localhost:8080/guest/getAllCoupons";
  //   const result = await axios.get(url);
  //   return result.data[0];
  // };

  // let coupon: CouponModel;
  useEffect(() => {
    axios.get("http://localhost:8080/guest/getAllCoupons").then((response) => {
      console.log(response.data);
      setCoupons(response.data);
    });
  }, []);

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
