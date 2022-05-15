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

<<<<<<< HEAD
=======
  //   function tabProps(index: number) {
  //     return {
  //       id: `simple-tab-${index}`,
  //       "aria-controls": `login-tabpanel-${index}`,
  //     };
  //   }
  //
  //

  // console.log(value);
  // console.log("entered login");

>>>>>>> aa329ebcbb1b2b8230c8d1899de9c2c75b63d9ae
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
