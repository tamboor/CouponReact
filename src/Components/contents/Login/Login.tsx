import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import LoginPanel from "../LoginPanel/LoginPanel";
import "./Login.css";
// import { Provider } from "react-redux";
// import { store } from "../../../state";

//todo: check if Provider needs to be moved to App
//TODO: add admin login
function Login(): JSX.Element {
  const [value, setValue] = useState<string>("customer");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card>
        <Box sx={{ borderBottom: 1, borderStyle: "solid", padding: 2 }}>
          <Tabs onChange={handleChange} value={value}>
            <Tab label="Customer Login" value="customer" />
            <Tab label="Company Login" value="company" />
            <Tab label="Admin Login" value="admin" />
          </Tabs>

          <LoginPanel userType={value} />
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
