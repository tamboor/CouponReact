import "./GuestHomepage.css";
import HomeImage from "../../../../Assets/images/guest_2.png";
import { Box, Grid } from "@mui/material";

function GuestHomepage(): JSX.Element {
  return (
    <div className="GuestHomepage">
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${HomeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    </div>
  );
}

export default GuestHomepage;
