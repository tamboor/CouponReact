import { Box, Button, Grid } from "@mui/material";
import "./Navbar.css";
interface NavBarProps {
  children?: JSX.Element;
  //userType: string;
}
function Navbar(props: NavBarProps): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid> {props.children}</Grid>
      </Grid>
    </Box>

    // <Grid>{props.children}</Grid>
    // <div className="Navbar">
    //   {/* <ul>
    //             <li>1</li>
    //             <li>2</li>
    //             <li>3</li>
    //         </ul> */}
    //   <Button variant="contained">1</Button>
    //   <Button variant="contained">2</Button>
    //   <Button variant="contained">3</Button>
    // </div>
  );
}

export default Navbar;
