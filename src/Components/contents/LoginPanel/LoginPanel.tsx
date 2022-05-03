import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import "./LoginPanel.css";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface LoginProps {
  children?: JSX.Element;
  userType: string;
}

function LoginPanel(props: LoginProps): JSX.Element {
  const { tryAdminLogin, tryCompanyLogin, tryCustomerLogin, tryLogout } =
    useActions();

  // const state = useTypedSelector((state) => state);
  const navigate = useNavigate();

  // console.log(state);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //TODO: cahnge to enum
  const onSubmit = (data: any) => {
    switch (props.userType) {
      case "customer":
        tryCustomerLogin(data.userEmail, data.userPass);
        navigate("/");
        break;
      case "company":
        tryCompanyLogin(data.userEmail, data.userPass);
        navigate("/");
        break;
      case "admin":
        tryAdminLogin(data.userEmail, data.userPass);
        break;
      default:
        tryLogout();
    }

    // if (localStorage.getItem("token") != undefined) {
    // }
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
