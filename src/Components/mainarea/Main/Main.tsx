import { Box, Grid } from "@mui/material";
import Coupon from "../../cards/Coupon/Coupon";

import Login from "../../guest/Login/Login";
import Routing from "../../Routing/Routing";
import Content from "../Content/Content";
import "./Main.css";

function Main(): JSX.Element {
  return (
    // <div className="Main">
    <Box>
      <Grid>
        <Routing />
      </Grid>
    </Box>
    // </div>
  );
}

export default Main;
