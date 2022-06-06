import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../../utils/colors";
import "./LoginButton.css";

function LoginButton(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Button
      color="inherit"
      onClick={() => {
        console.log("clicked login button!!!!");
        navigate("/loginPage");
      }}
      variant="contained"
      sx={{
        color: colors.WHITE,
        backgroundColor: colors.PINK,
        border: 2,
        borderColor: colors.PURPLE,
        margin: 2,
        "&:hover": { color: "black" },
      }}
    >
      Login
    </Button>
  );
}

export default LoginButton;
