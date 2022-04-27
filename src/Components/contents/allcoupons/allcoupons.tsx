import { Box, Container, Grid, Typography } from "@mui/material";
import Coupon from "../../cards/Coupon/Coupon";
import "./allcoupons.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CouponModel } from "../../../Models/CouponModel";

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
          {/* <Coupon coupon={coupons.length > 0 ? coupons[0] : []} /> */}
          {/* <p>{coupons.length > 0 ? coupons[0].title : "no coupon"}</p> */}
          {/* <Typography>{coupons[0].title}</Typography> */}
          {/* <Coupon {...coupons[1]} /> */}
          {coupons.map((c) => (
            <Coupon {...c} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
//
////

export default Allcoupons;
