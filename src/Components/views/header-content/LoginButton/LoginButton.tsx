import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

function LoginButton(): JSX.Element {
  const navigate = useNavigate();

  // function handleClick() {
  //   navigate("/loginPage");
  // }

  return (
    <Button
      color="inherit"
      onClick={() => {
        console.log("clicked login button!!!!");
        navigate("/loginPage");
      }}
    >
      Login
    </Button>
  );
}

export default LoginButton;
