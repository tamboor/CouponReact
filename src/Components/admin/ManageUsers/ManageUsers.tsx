import { Container, Card, Box, Tabs, Tab, Button, Paper } from "@mui/material";
import { useState } from "react";
import GetAllCompanies from "../GetAllCompanies/GetAllCompanies";
// import AddCompanyForm from "../../admin/AddCompanyForm";
import ActionCustomerForm from "../ActionCustomerForm/ActionCustomerForm";
import ActionCompanyForm from "../ActionCompanyForm/ActionCompanyForm";
import LoginPanel from "../../guest/LoginPanel/LoginPanel";
import "./ManageUsers.css";
import { AdminVerbs } from "../AdminVerbs";
import GetAllCustomers from "../GetAllCustomers/GetAllCustomers";

function ManageUsers(): JSX.Element {
  const [value, setValue] = useState<string>("Customers");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // const handleFormSubmit = (data: CustomerModel) => {
  //   setCustomer(data);
  // };

  function renderSwitch() {
    switch (value) {
      case "Customers":
        return <GetAllCustomers />;
      case "Companies":
        return <GetAllCompanies />;
    }
  }

  function addButtonRenderSwitch() {
    switch (value) {
      case "Customers":
        return (
          <ActionCustomerForm
            verb={AdminVerbs.ADD}
            // updateFunc={handleFormSubmit}
          />
        );
      case "Companies":
        return (
          <ActionCompanyForm
            verb={AdminVerbs.ADD}
            // updateFunc={handleFormSubmit}
          />
        );
    }
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card>
        <Box sx={{ borderBottom: 1, borderStyle: "solid", padding: 2 }}>
          <Tabs onChange={handleChange} value={value}>
            <Tab label="Customers" value="Customers" />
            <Tab label="Companies" value="Companies" />
          </Tabs>

          {addButtonRenderSwitch()}
          {renderSwitch()}
        </Box>
      </Card>
    </Container>
  );
}

export default ManageUsers;
