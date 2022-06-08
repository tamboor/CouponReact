import { Box, Grid } from "@mui/material";

import Routing from "../../Routing/Routing";
import "./Main.css";
import background from "../../../../Assets/images/bg_shapes.png";
import { colors } from "../../../../utils/colors";

function Main(): JSX.Element {
  return (
    // <div className="Main">
    <Box
      minHeight="100vh"
      paddingTop={5}
      sx={{ backgroundColor: colors.WHITE }}
      // sx={{ backgroundColor:  }}
    >
      {/* <Grid container component="main" position="sticky"> */}
      <Routing />
      {/* </Grid> */}
    </Box>
    // </div>
  );
}

export default Main;
