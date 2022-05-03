import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import LoginButton from "../../header-content/LoginButton/LoginButton";
import UserMenu from "../../header-content/UserMenu/UserMenu";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
  const state = useTypedSelector((state) => state);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Coupon Mania
        </Typography>
        {state.users.userRole === "guest" ? <LoginButton /> : <UserMenu />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
