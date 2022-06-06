import { Box, Grid } from "@mui/material";

import Routing from "../../Routing/Routing";
import "./Main.css";

function Main(): JSX.Element {
  return (
    // <div className="Main">
    <Box>
      {/* <Grid container component="main" position="sticky"> */}
      <Routing />
      {/* </Grid> */}
    </Box>
    // </div>
  );
}

export default Main;
