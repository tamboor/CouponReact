import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Fab,
  Grid,
  Slide,
  Toolbar,
  Typography,
  useColorScheme,
  useScrollTrigger,
  Zoom,
} from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { colors } from "../../../../utils/colors";

import LoginButton from "../../header-content/LoginButton/LoginButton";
import RegisterButton from "../../header-content/RegisterButton/RegisterButton";
import ShoppingCart from "../../header-content/ShoppingCart/ShoppingCart";
import UserMenu from "../../header-content/UserMenu/UserMenu";
import logo from "../../../../Assets/images/logo.png";
import "./Header.css";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header(props: Props): JSX.Element {
  const state = useTypedSelector((state) => state);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: colors.PURPLE,
          }}
        >
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box
                  component="img"
                  onClick={() => {
                    switch (state.users.userRole) {
                      case "customer":
                        navigate("/customer-home");
                        break;
                      case "company":
                        navigate("/company-home");
                        break;
                      case "admin":
                        navigate("/admin-home");
                        break;
                      case "guest":
                        navigate("/");
                        break;
                    }
                  }}
                  sx={{
                    // flexGrow: 1,
                    height: 64,
                    "&:hover": { cursor: "pointer" },
                  }}
                  alt="logo."
                  src={logo}
                />
              </Grid>
              {/* <Grid item xs={4}></Grid> */}
            </Grid>

            <Box component="span">
              {state.users.userRole === "customer" && <ShoppingCart />}
            </Box>
            <Box component="span">
              {state.users.userRole === "guest" && <RegisterButton />}
            </Box>
            <Box component="span">
              {" "}
              {state.users.userRole === "guest" ? (
                <LoginButton />
              ) : (
                <UserMenu />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}

export default Header;
