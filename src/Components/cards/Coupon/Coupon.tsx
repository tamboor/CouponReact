import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Coupon.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CouponModel } from "../../../Models/CouponModel";

// interface couponProps {
//   amount: number;
//   category: string;
//   description: string;
//   endDate: number;
//   id: number;
//   image: string;
//   price: number;
//   startDate: number;
//   title: string;
// }
interface couponProps {
  coupon: CouponModel;
}

function Coupon(props: couponProps): JSX.Element {
  //
  return (
    <Grid item xs={3}>
      <Paper elevation={12}>
        <img
          src="https://m.gagam.co.il/wp-content/uploads/2017/10/מגנה-הדפסת-תמונה-על-מגנט-תמונות-על-מגנט-2.jpg"
          alt=""
          className="img"
        />
        <Box paddingX={2} paddingY={1}>
          <Typography variant="h4" component="h2">
            {props.coupon.title}
          </Typography>
          <Box>
            <Typography variant="h5" component="p">
              <CalendarMonthIcon
                sx={{
                  width: "2rem",
                  marginRight: 0.5,
                }}
              />
              Date
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Coupon;
