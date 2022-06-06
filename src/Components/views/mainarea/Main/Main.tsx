import { Box, Grid } from "@mui/material";

import Routing from "../../Routing/Routing";
import "./Main.css";
import background from "../../../../Assets/images/bg_shapes.png";

function Main(): JSX.Element {
  return (
    // <div className="Main">
    <Box
      minHeight="100vh"
      paddingTop={5}
      sx={{ backgroundImage: `url(${background})` }}
    >
      {/* <Grid container component="main" position="sticky"> */}
      <Routing />
      {/* </Grid> */}
    </Box>
    // </div>
  );
}

export default Main;
