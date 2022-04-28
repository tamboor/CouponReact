import { Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import "./LoginPanel.css";

interface LoginProps {
  userType: string;
  //   email: string;
  //   password: string;
}

function LoginPanel(props: LoginProps): JSX.Element {
  //   return <div className="LoginPanel">This is Login , {props.userType}</div>;
  return (
    <Container>
      <Box>
        <TextField id="email" label="Email" variant="standard" />
        <br />
        <TextField id="password" label="Password" variant="standard" />
      </Box>
    </Container>
  );
}

export default LoginPanel;
