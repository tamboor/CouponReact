import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Fab,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
} from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import ManageUsers from "../../../user-specific/admin/ManageUsers/ManageUsers";
// import { useActions } from "../../../hooks/useActions";
// import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CouponMenu from "../../header-content/CouponMenu/CouponMenu";
import LoginButton from "../../header-content/LoginButton/LoginButton";
import ManageUsersButton from "../../header-content/ManageUsersButton/ManageUsersButton";
import MyCouponsButton from "../../header-content/MyCouponsButton/MyCouponsButton";
import RegisterButton from "../../header-content/RegisterButton/RegisterButton";
import ShoppingCart from "../../header-content/ShoppingCart/ShoppingCart";
import UserMenu from "../../header-content/UserMenu/UserMenu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// function ScrollTop(props: Props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     const anchor = (
//       (event.target as HTMLDivElement).ownerDocument || document
//     ).querySelector("#back-to-top-anchor");

//     if (anchor) {
//       anchor.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   };

//   return (
//     <Zoom in={trigger}>
//       <Box
//         onClick={handleClick}
//         role="presentation"
//         sx={{ position: "fixed", bottom: 16, right: 16 }}
//       >
//         {children}
//       </Box>
//     </Zoom>
//   );
// }

function Header(props: Props): JSX.Element {
  const state = useTypedSelector((state) => state);

  const navigate = useNavigate();

  // const { clearRedux } = useActions();

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return (
          <Box>
            <CouponMenu />
          </Box>
        );
      case "company":
        return (
          <Box>
            <Button color="inherit">hello company</Button>
            <Button color="inherit">hello company 2</Button>
          </Box>
        );
      case "admin":
        return (
          <Box>
            <ManageUsersButton />
          </Box>
        );
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

  // const redoForms = () => {
  //   clearRedux();
  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
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
                }
              }}
            >
              Coupon Mania
            </Typography>
            {/* <Navbar>{renderSwitch()}</Navbar> */}

            {/* <Button onClick={redoForms} color="inherit">
          Clear redux
        </Button> */}
            {state.users.userRole === "admin" && (
              <Box>
                {/* <Navbar> */}
                <ManageUsersButton />
                {/* </Navbar> */}
              </Box>
            )}
            {/* {state.users.userRole === "customer" && <MyCouponsButton />} */}
            {state.users.userRole === "customer" && <ShoppingCart />}
            {state.users.userRole === "guest" && <RegisterButton />}
            {state.users.userRole === "guest" ? <LoginButton /> : <UserMenu />}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}
    </React.Fragment>
  );
}

export default Header;

// {
//   () => {
//     switch (state.users.userRole) {
//       case "customer":
//         return <Button>hello</Button>;
//       // break;
//       case "company":
//         return <Button>hello company</Button>;
//         break;
//       case "admin":
//         break;
//       default:
//         return;
//     }
//   };
// }
