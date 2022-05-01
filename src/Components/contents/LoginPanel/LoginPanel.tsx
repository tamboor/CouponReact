import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import "./LoginPanel.css";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  children?: JSX.Element;
  userType: string;
  //   email: string;
  //   password: string;
}

function LoginPanel(props: LoginProps): JSX.Element {
  //   return <div className="LoginPanel">This is Login , {props.userType}</div>;

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   navigate("/");
  // };
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>{props.userType}</Typography>
          <TextField
            {...register("userEmail", { required: "this is required" })}
            label="Email"
            variant="standard"
          />
          <br />
          <TextField
            {...register("userPass", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="Password"
            variant="standard"
          />
          <Button type="submit">Login</Button>
          {/* <input type="submit" value="Login" />
          {errors.userEmail && <span>{errors.userEmail.message}</span>} */}
        </form>
      </Box>
    </Container>
  );
}

export default LoginPanel;
