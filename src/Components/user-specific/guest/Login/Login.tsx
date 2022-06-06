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
import imgLogin from "../../../../Assets/images/login_pic.png";

import "./Login.css";
import { colors } from "../../../../utils/colors";

function Login(): JSX.Element {
  const [value, setValue] = useState<string>("customer");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const theme = createTheme();

  console.log("here");

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid container component="main" sx={{ height: "90vh" }}> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${imgLogin})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "100% 100%",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ backgroundColor: colors.LIGHT_BLUE }}
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

              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Tabs onChange={handleChange} value={value} variant="fullWidth">
              <Tab label="Customer" value="customer" />
              <Tab label="Company" value="company" />
              <Tab label="Admin" value="admin" />
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
