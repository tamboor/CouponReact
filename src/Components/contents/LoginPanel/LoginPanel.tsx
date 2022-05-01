import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import "./LoginPanel.css";

interface LoginProps {
  children?: JSX.Element;
  userType: string;
  //   email: string;
  //   password: string;
}

function LoginPanel(props: LoginProps): JSX.Element {
  //   return <div className="LoginPanel">This is Login , {props.userType}</div>;

  const { register } = useForm();
  const onSubmit = () => {
    console.log("submitted");
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Box>
          <Typography>{props.userType}</Typography>
          <TextField
            {...register("userEmail")}
            label="Email"
            variant="standard"
          />
          <br />
          <TextField
            {...register("userPass")}
            label="Password"
            variant="standard"
          />
          <Button type="submit">Login</Button>
        </Box>
      </form>
    </Container>
  );
}

export default LoginPanel;
