import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import LoginPanel from "../LoginPanel/LoginPanel";
import "./Login.css";

function Login(): JSX.Element {
  const [value, setValue] = useState<string>("");

  //   function tabProps(index: number) {
  //     return {
  //       id: `simple-tab-${index}`,
  //       "aria-controls": `login-tabpanel-${index}`,
  //     };
  //   }
  console.log("entered login");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs onChange={handleChange}>
            <Tab label="Customer Login" />
            <Tab label="Company Login" />
          </Tabs>
          <LoginPanel userType={value} />
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
