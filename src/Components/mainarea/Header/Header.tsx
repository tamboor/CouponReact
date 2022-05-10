import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CouponMenu from "../../header-content/CouponMenu/CouponMenu";
import LoginButton from "../../header-content/LoginButton/LoginButton";
import ShoppingCart from "../../header-content/ShoppingCart/ShoppingCart";
import UserMenu from "../../header-content/UserMenu/UserMenu";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

function Header(): JSX.Element {
  const state = useTypedSelector((state) => state);

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return (
          <Box>
            <CouponMenu />
          </Box>
        );
      // break;
      case "company":
        return (
          <Box>
            <Button color="inherit">hello company</Button>
            <Button color="inherit">hello company 2</Button>
          </Box>
        );
      // break;
      case "admin":
        return (
          <Box>
            <Button color="inherit">hello amdin</Button>
            <Button color="inherit">hello admin 2</Button>
          </Box>
        );
      // break;
      default:
        return (
          <Box>
            <Button color="inherit">hello guest</Button>
            <Button color="inherit">hello guest 2</Button>
          </Box>
        );
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Coupon Mania
        </Typography>
        <Navbar>{renderSwitch()}</Navbar>
        <ShoppingCart />
        {state.users.userRole === "guest" ? <LoginButton /> : <UserMenu />}
      </Toolbar>
    </AppBar>
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
