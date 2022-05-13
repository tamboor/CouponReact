import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CouponMenu from "../../header-content/CouponMenu/CouponMenu";
import LoginButton from "../../header-content/LoginButton/LoginButton";
import ManageUsersButton from "../../header-content/ManageUsersButton/ManageUsersButton";
import ShoppingCart from "../../header-content/ShoppingCart/ShoppingCart";
import UserMenu from "../../header-content/UserMenu/UserMenu";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

function Header(): JSX.Element {
  const state = useTypedSelector((state) => state);

  const { clearRedux } = useActions();

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
            <ManageUsersButton />
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

  // const redoForms = () => {
  //   clearRedux();
  // };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Coupon Mania
        </Typography>
        <Navbar>{renderSwitch()}</Navbar>
        {/* <Button onClick={redoForms} color="inherit">
          Clear redux
        </Button> */}
        {state.users.userRole === "customer" && <ShoppingCart />}
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
