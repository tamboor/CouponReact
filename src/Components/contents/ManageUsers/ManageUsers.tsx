import { Container, Card, Box, Tabs, Tab, Button, Paper } from "@mui/material";
import { useState } from "react";
import AddClientForm from "../AddClientForm/AddClientForm";
import LoginPanel from "../LoginPanel/LoginPanel";
import UserPanel from "../UserPanel/UserPanel";
import "./ManageUsers.css";

function ManageUsers(): JSX.Element {
  const [value, setValue] = useState<string>("Customers");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  function renderSwitch() {
    switch (value) {
      case "Customers":
        return <UserPanel userType={value} />;
      case "Companies":
        return <UserPanel userType={value} />;
    }
  }

  function addButtonRenderSwitch() {
    switch (value) {
      case "Customers":
        return <AddClientForm clientType="Customer" />;
      case "Companies":
        return <AddClientForm clientType="Company" />;
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
          {/* <UserPanel userType={value} /> */}
        </Box>
      </Card>
    </Container>
  );
}

export default ManageUsers;
