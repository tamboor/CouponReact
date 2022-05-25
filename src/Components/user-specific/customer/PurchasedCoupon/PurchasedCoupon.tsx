import { Card, Paper, Typography } from "@mui/material";
import { CouponModel } from "../../../../Models/CouponModel";
import "./PurchasedCoupon.css";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface PurchasedCouponProps {
  coupon: CouponModel;
}
function PurchasedCoupon(props: PurchasedCouponProps): JSX.Element {
  return (
    <div className="PurchasedCoupon">
      <Paper>
        <img src={props.coupon.image} alt="" className="img" />
        <Typography variant="h4" component="h2">
          {props.coupon.title}
        </Typography>
        <Typography variant="h6" component="h2">
          {props.coupon.description}
        </Typography>
        <Typography variant="h6" component="p">
          <EventAvailableIcon
            sx={{
              width: "2rem",
              marginRight: 0.5,
            }}
          />
          {props.coupon.startDate}
        </Typography>
        <Typography variant="h6" component="p">
          <EventBusyIcon
            sx={{
              width: "2rem",
              marginRight: 0.5,
            }}
          />
          {props.coupon.endDate}
        </Typography>
      </Paper>
    </div>
  );
}

export default PurchasedCoupon;
