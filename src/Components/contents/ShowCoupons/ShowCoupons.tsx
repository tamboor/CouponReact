import { Box, Container, Grid, Typography } from "@mui/material";
import Coupon from "../../cards/Coupon/Coupon";
import "./ShowCoupons.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CouponModel } from "../../../Modals/CouponModel";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";

// interface ShowCouponsProps {
//   verb: string;
//   filter: string;
// }

function ShowCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  const state = useTypedSelector((state) => state);
  const token = localStorage.getItem("token") as string;

  let { verb, filter } = useParams();
  //TODO: handle any
  function fetchCoupons(verb: string, filter: string): any {
    const url =
      "http://localhost:8080/" + state.users.userRole + "/" + verb + filter;

    axios
      .get(url, { headers: { Authorization: token } })
      .then((response) => {
        // console.log(response.data);
        console.log(url);
        console.log(response.data);
        // setCoupons(response.data);
        // console.log(coupons);

        return response.data;
      })
      .catch((error) => {
        //TODO: navigate to error

        console.log(error);
        return [];
      });
  }
  useEffect(() => {
    const applyVerb =
      verb === "" || verb === undefined || verb === null
        ? "getAllCoupons"
        : verb;
    const applyFilter =
      filter === "" || filter === undefined || filter === null
        ? ""
        : "/" + filter;

    setCoupons(fetchCoupons(applyVerb, applyFilter));
  }, []);

  // const state = useTypedSelector((state) => state);
  // console.log(state);

  // console.log(localStorage.getItem("token"));

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

export default ShowCoupons;
