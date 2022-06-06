import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Fab,
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

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return <Box></Box>;
      case "company":
        return (
          <Box>
            <Button color="inherit">hello company</Button>
            <Button color="inherit">hello company 2</Button>
          </Box>
        );
      case "admin":
        return <Box></Box>;
      default:
        return (
          <Box>
            <Button color="inherit">hello guest</Button>
            <Button color="inherit">hello guest 2</Button>
            <Button>Register</Button>
          </Box>
        );
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: colors.PURPLE }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Abril Fatface",
                "&:hover": { cursor: "pointer" },
              }}
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
            >
              Coupon Mania
            </Typography>

            {state.users.userRole === "customer" && <ShoppingCart />}
            {state.users.userRole === "guest" && <RegisterButton />}
            {state.users.userRole === "guest" ? <LoginButton /> : <UserMenu />}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}

export default Header;
