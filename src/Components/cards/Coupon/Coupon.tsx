import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Coupon.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Coupon(): JSX.Element {
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
            Coupon.
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
