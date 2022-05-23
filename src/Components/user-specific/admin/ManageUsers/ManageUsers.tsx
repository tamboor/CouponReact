import { Container, Card, Box, Tabs, Tab, Button, Paper } from "@mui/material";
import { useState } from "react";
import GetAllCompanies from "../GetAllCompanies/GetAllCompanies";
// import ActionCustomerForm from "../../forms/ActionCustomerForm/ActionCustomerForm";
// import LoginPanel from "../../guest/LoginPanel/LoginPanel";
import "./ManageUsers.css";
import { AdminVerbs } from "../AdminVerbs";
import GetAllCustomers from "../GetAllCustomers/GetAllCustomers";
import ActionCompanyForm from "../../../forms/ActionCompanyForm/ActionCompanyForm";
import ActionCustomerForm from "../../../forms/ActionCustomerForm/ActionCustomerForm";
import ActionUserForm from "../../../forms/AcionUserForm/ActionUserForm";
// import ActionCompanyForm from "../../forms/ActionCompanyForm/ActionCompanyForm";

function ManageUsers(): JSX.Element {
  const [value, setValue] = useState<string>("Customers");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // const handleFormSubmit = (data: CustomerModel) => {
  //   setCustomer(data);
  // };
  const addFunction = () => {};
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
          <ActionUserForm
            verb={AdminVerbs.ADD}
            formType="customer"
            // addFunc={addFunction}
          />
        );
      case "Companies":
        return (
          <ActionUserForm
            verb={AdminVerbs.ADD}
            formType="company"
            // addFunc={addFunction}
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
