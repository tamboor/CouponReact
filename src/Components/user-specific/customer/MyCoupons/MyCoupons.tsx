import { Container, Grid, Typography } from "@mui/material";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import notify from "../../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
import PurchasedCoupon from "../PurchasedCoupon/PurchasedCoupon";
import "./MyCoupons.css";

interface myCouponsProps {
  coupons: CouponModel[];
}

function MyCoupons(props: myCouponsProps): JSX.Element {
  return (
    <div className="MyCoupons">
      <Typography>My Coupons</Typography>
      <Container>
        <Grid container spacing={5} marginTop={0.005}>
          {props.coupons.map((c: CouponModel, index: number) => (
            <PurchasedCoupon coupon={c} key={index} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default MyCoupons;
