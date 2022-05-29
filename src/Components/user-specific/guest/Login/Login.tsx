import {
  Box,
  Card,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoginPanel from "../LoginPanel/LoginPanel";

import "./Login.css";
// import { Provider } from "react-redux";
// import { store } from "../../../state";

//todo: check if Provider needs to be moved to App
//TODO: add admin login
function Login(): JSX.Element {
  const [value, setValue] = useState<string>("customer");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const theme = createTheme();

  console.log("here");

  return (
    // <Container sx={{ marginTop: 5 }}>
    //   <Card>
    //     <Box sx={{ borderBottom: 1, borderStyle: "solid", padding: 2 }}>
    //       <Tabs onChange={handleChange} value={value}>
    //         <Tab label="Customer Login" value="customer" />
    //         <Tab label="Company Login" value="company" />
    //         <Tab label="Admin Login" value="admin" />
    //       </Tabs>

    //       <LoginPanel userType={value} />
    //     </Box>
    //   </Card>
    // </Container>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: `url("https://wallpaperaccess.com/full/39610.jpg")`,
            // backgroundImage: `url("https://wallpaperaccess.com/full/1112518.jpg")`,
            backgroundImage: `url("https://wallpaperaccess.com/full/234831.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ backgroundColor: "#15bfa3" }}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              // backgroundColor: "pink",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Tabs
              onChange={handleChange}
              value={value}
              variant="fullWidth"
              // sx={{
              //   my: 8,
              //   mx: 4,
              //   display: "flex",
              //   flexDirection: "column",
              //   alignItems: "center",
              //   backgroundColor: (t) =>
              //     t.palette.mode === "light"
              //       ? t.palette.grey[50]
              //       : t.palette.grey[900],
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              // }}
            >
              <Tab label="Customer Login" value="customer" />
              <Tab label="Company Login" value="company" />
              <Tab label="Admin Login" value="admin" />
            </Tabs>
            <br />
            <LoginPanel userType={value} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
