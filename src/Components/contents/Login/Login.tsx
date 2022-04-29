import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import LoginPanel from "../LoginPanel/LoginPanel";
import "./Login.css";

function Login(): JSX.Element {
  const [value, setValue] = useState<string>("customer");

  //   function tabProps(index: number) {
  //     return {
  //       id: `simple-tab-${index}`,
  //       "aria-controls": `login-tabpanel-${index}`,
  //     };
  //   }
  //
  //
  console.log("entered login");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card>
        <Box sx={{ borderBottom: 1, borderStyle: "solid", padding: 2 }}>
          <Tabs onChange={handleChange}>
            <Tab label="Customer Login" value="customer" />
            <Tab label="Company Login" value="company" />
          </Tabs>
          <LoginPanel userType={value} />
          {/* <LoginPanel userType="" */}
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
