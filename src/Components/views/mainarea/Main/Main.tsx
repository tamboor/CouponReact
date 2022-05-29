import { Box, Grid } from "@mui/material";
// import Coupon from "../../cards/Coupon/Coupon";

// import Login from "../../guest/Login/Login";
import Routing from "../../Routing/Routing";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main(): JSX.Element {
  return (
    // <div className="Main">
    <Box>
      <Grid container component="main" position="sticky">
        <Routing />
      </Grid>
    </Box>
    // </div>
  );
}

export default Main;
