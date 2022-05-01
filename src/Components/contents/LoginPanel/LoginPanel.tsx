import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import "./LoginPanel.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  children?: JSX.Element;
  userType: string;
}

// interface LoginForm {
//   userEmail: string;
//   userPass: string;
// }

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
    // console.log(data);
    // console.log(errors);
    const url = `http://localhost:8080/${props.userType}/login`;
    // const url = `http://localhost:8080/admin/login`;
    axios
      .post(url, {
        role: props.userType,
        // role: "admin",
        userName: data.userEmail,
        userPass: data.userPass,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
          {errors.userEmail && <p>{errors.userEmail.message}</p>}
          <br />
          <TextField
            {...register("userPass", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="Password"
            variant="standard"
          />
          {errors.userPass && <p>{errors.userPass.message}</p>}
          <Button type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPanel;
