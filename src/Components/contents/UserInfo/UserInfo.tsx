import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./UserInfo.css";
import axios, { AxiosResponse } from "axios";
import { Paper, Box, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { CompanyModel } from "../../../Modals/CompanyModel";
import { CustomerModel } from "../../../Modals/CustomerModel";
import notify from "../../utils/Notify";

//TODO: move axios to an import
function UserInfo(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerModel>();
  const [company, setCompany] = useState<CompanyModel>();
  const token = localStorage.getItem("token") as string;

  //todo: and 'catch' after every 'then'
  useEffect(() => {
    let url = "";
    switch (state.users.userRole) {
      case "customer":
        url = "http://localhost:8080/customer/getCustomerDetails";
        axios
          .get(url, { headers: { Authorization: token } })
          .then((res) => {
            const headers = res.headers;
            localStorage.setItem("token", headers.authorization);
            setCustomer(res.data);
          })
          .catch((error) => {
            console.log(error.response.status);
            notify.error(error.response.data.description);
            console.log(error);
          });

        break;
      case "company":
        url = "http://localhost:8080/company/getCompanyDetails";
        axios
          .get(url, { headers: { Authorization: token } })
          .then((res) => {
            const headers = res.headers;
            localStorage.setItem("token", headers.authorization);
            setCompany(res.data);
          })
          .catch((error) => {
            console.log(error.response.status);
            notify.error(error.response.data.description);
            console.log(error);
          });

        break;
      default:
        navigate("/404");
        break;
    }
    // const value = localStorage.getItem("token")
  }, []);

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return (
          <Paper elevation={12}>
            <Box paddingX={2} paddingY={1}>
              <Typography variant="h4" component="h2">
                {customer?.firstName}
              </Typography>
              <Typography variant="h4" component="h2">
                {customer?.lastName}
              </Typography>
              <Typography variant="h4" component="h2">
                {customer?.email}
              </Typography>
              <Typography variant="h4" component="h2">
                {customer?.password}
              </Typography>
            </Box>
          </Paper>
        );
      case "company":
        return (
          <Paper elevation={12}>
            <Box paddingX={2} paddingY={1}>
              <Typography variant="h4" component="h2">
                {company?.name}
              </Typography>
              <Typography variant="h4" component="h2">
                {company?.email}
              </Typography>
              <Typography variant="h4" component="h2">
                {company?.password}
              </Typography>
            </Box>
          </Paper>
        );
    }
  }

  //   if (state.users.userRole !== "admin") {
  //     const url = ``;
  //   }
  //todo: return a <UserDetails> component with 'user' as props
  return <Container sx={{ marginTop: 5 }}>{renderSwitch()}</Container>;
}

export default UserInfo;
// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error("Function not implemented.");
// }

// function setCoupons(data: any) {
//   throw new Error("Function not implemented.");
// }
