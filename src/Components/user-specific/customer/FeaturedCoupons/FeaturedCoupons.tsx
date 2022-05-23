import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Transition } from "react-transition-group";
import { CouponModel } from "../../../../Models/CouponModel";
import Coupon from "../../../cards/Coupon/Coupon";
import "./FeaturedCoupons.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface IFeaturedProps {
  allCoupons: CouponModel[];
}

// const showAmount = 3;
// const defaultStyle = {
//   transition: `opacity ${150}ms ease-in-out`,
//   opacity: 0,
// };

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 0 },
//   exited: { opacity: 0 },
// };

function FeaturedCoupons(props: IFeaturedProps): JSX.Element {
  //   const [showCoupon, setShowCoupon] = useState<CouponModel>(
  //     props.allCoupons[0]
  //   );
  // console.log(props.allCoupons[0]);

  // console.log(props.allCoupons);

  return (
    <Box sx={{ alignItems: "center" }}>
      {/* <ArrowBackIosIcon /> */}
      {props.allCoupons.length > 0 ? (
        <Coupon
          coupon={props.allCoupons[0]}
          isPurchased={false}
          styles={{ width: "20%", margin: "auto", padding: "10px" }}
        />
      ) : null}
      {/* <ArrowForwardIosIcon /> */}
    </Box>
  );
}

export default FeaturedCoupons;
