import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./UserInfo.css";
import axios, { AxiosResponse } from "axios";
import { Paper, Box, Typography } from "@mui/material";
import { UserModel } from "../../../Modals/UserModel";
import { useState } from "react";
import { useEffect } from "react";
import UserDetails from "../../cards/UserDetails/UserDetails";

//TODO: move axios to an import
function UserInfo(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const navigate = useNavigate();
  //   const [user, setUser] = useState<CustomerModel | CompanyModel>();
  const [user, setUser] = useState<UserModel>();
  const token = localStorage.getItem("token") as string;

  //todo: and 'catch' after every 'then'
  useEffect(() => {
    let url = "";
    switch (state.users.userRole) {
      case "customer":
        url = "http://localhost:8080/customer/getCustomerDetails";
        axios
          .get(url, { headers: { Authorization: token } })
          .then((response) => {
            console.log(response.data);
            setUser(response.data);
          });
        break;
      case "company":
        url = "http://localhost:8080/company/getCompanyDetails";
        axios
          .get(url, { headers: { Authorization: token } })
          .then((response) => {
            console.log(response.data);
            setUser(response.data);
          });
        break;
      default:
        navigate("/404");
        break;
    }
    // const value = localStorage.getItem("token")
  }, []);

  //   if (state.users.userRole !== "admin") {
  //     const url = ``;
  //   }
  //todo: return a <UserDetails> component with 'user' as props
  return (
    <Paper elevation={12}>
      <Box paddingX={2} paddingY={1}>
        <Typography variant="h4" component="h2">
          {user?.name}
        </Typography>
        <Typography variant="h4" component="h2">
          {user?.lastName}
        </Typography>
        <Typography variant="h4" component="h2">
          {user?.email}
        </Typography>
        <Typography variant="h4" component="h2">
          {user?.password}
        </Typography>
      </Box>
    </Paper>
  );
}

export default UserInfo;
// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error("Function not implemented.");
// }

// function setCoupons(data: any) {
//   throw new Error("Function not implemented.");
// }
