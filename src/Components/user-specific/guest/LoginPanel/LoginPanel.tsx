import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import "./LoginPanel.css";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
import axios, { AxiosError, AxiosResponse } from "axios";
import globals, { host } from "../../../../utils/globals";
import notify from "../../../../utils/Notify";

interface LoginProps {
  children?: JSX.Element;
  userType: string;
}

function LoginPanel(props: LoginProps): JSX.Element {
  const { tryAdminLogin, tryCompanyLogin, tryCustomerLogin, tryLogout } =
    useActions();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //TODO: cahnge to enum
  const onSubmit = (data: any) => {
    const sendLogin = (
      url: string,
      role: string,
      userName: string,
      userPass: string,
      callback: (error: AxiosError) => any
    ) => {
      axios
        .post(url, { role: role, userName: userName, userPass: userPass })
        .then((res) => {
          switch (role) {
            case "customer":
              tryCustomerLogin(userName, userPass);
              navigate("/customer-home");
              break;
            case "company":
              tryCompanyLogin(userName, userPass);
              navigate("/company-home");
              break;
            case "admin":
              tryAdminLogin(userName, userPass);
              navigate("/admin-home");
              break;
            default:
              tryLogout();
          }
          setStoredToken(res);
        })
        .catch((err: AxiosError) => {
          callback(err);
        });
    };

    switch (props.userType) {
      case "customer":
        sendLogin(
          `${host}/customer/login`,
          "customer",
          data.userEmail,
          data.userPass,
          (err: AxiosError) => {
            notify.error("Invalid username or password");
          }
        );
        break;
      case "company":
        sendLogin(
          `${host}/company/login`,
          "company",
          data.userEmail,
          data.userPass,
          (err: AxiosError) => {
            notify.error("Invalid username or password");
          }
        );
        break;
      case "admin":
        sendLogin(
          `${host}/admin/login`,
          "admin",
          data.userEmail,
          data.userPass,
          (err: AxiosError) => {
            notify.error("Invalid username or password");
          }
        );
        break;
      default:
        tryLogout();
    }
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("userEmail", { required: "this is required" })}
            label="Email"
            variant="outlined"
          />
          {errors.userEmail && <p>{errors.userEmail.message}</p>}
          <br />
          <br />
          <TextField
            {...register("userPass", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="Password"
            variant="outlined"
            type="password"
          />
          {errors.userPass && <p>{errors.userPass.message}</p>}
          <br />
          <br />

          <Button type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPanel;
