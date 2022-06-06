import { useNavigate } from "react-router-dom";
// import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./UserInfo.css";
import axios, { AxiosResponse } from "axios";
import { Paper, Box, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { CustomerModel } from "../../../../Models/CustomerModel";
import notify from "../../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
import { host } from "../../../../utils/globals";

function UserInfo(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerModel>();
  const [company, setCompany] = useState<CompanyModel>();

  useEffect(() => {
    let url = "";
    switch (state.users.userRole) {
      case "customer":
        url = `${host}/customer/getCustomerDetails`;
        axios
          .get(url, getAuthHeaders())
          .then((res) => {
            setStoredToken(res);
            setCustomer(res.data);
          })
          .catch((error) => {
            notify.error(error.response.data.description);
          });

        break;
      case "company":
        url = `${host}/company/getCompanyDetails`;
        axios
          .get(url, getAuthHeaders())
          .then((res) => {
            setStoredToken(res);
            setCompany(res.data);
          })
          .catch((error) => {
            notify.error(error.response.data.description);
          });

        break;
      default:
        navigate("/404");
        break;
    }
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

  return <Container sx={{ marginTop: 5 }}>{renderSwitch()}</Container>;
}

export default UserInfo;
