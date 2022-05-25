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

function MyCoupons(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.users.userRole !== "customer") {
      navigate("/");
      return;
    }
    const url = "http://localhost:8080/customer/getCustomerCoupons";
    axios
      .get(url, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCoupons(response.data);
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
        console.log(error);
      });
  }, []);
  return (
    <div className="MyCoupons">
      <Typography>My Coupons</Typography>
      <Container>
        <Grid container spacing={5} marginTop={0.005}>
          {coupons.map((c: CouponModel, index: number) => (
            // <React.Fragment key={index}>
            <PurchasedCoupon coupon={c} key={index} />
            // </React.Fragment>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default MyCoupons;
