import { Grid } from "@mui/material";
import { CouponModel } from "../../../../Models/CouponModel";
import Coupon from "../../../cards/Coupon/Coupon";
import "./CouponList.css";

interface CouponProps {
  coupons: CouponModel[];
  ignoredCoupons: number[];
}

function CouponList(props: CouponProps): JSX.Element {
  const { coupons, ignoredCoupons } = props;

  const itemStyle = {
    padding: "1vh",
  };

  return (
    <Grid container>
      {coupons.map((coupon: CouponModel, index: number) => (
        <Grid item xs={3} key={index} sx={itemStyle}>
          <Coupon
            coupon={coupon}
            isPurchased={ignoredCoupons.includes(coupon.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CouponList;
