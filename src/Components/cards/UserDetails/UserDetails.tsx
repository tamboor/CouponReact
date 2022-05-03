import { Grid, Paper, Box, Typography } from "@mui/material";
import { UserModel } from "../../../Modals/UserModel";
import "./UserDetails.css";
interface userProps {
  children?: JSX.Element;
  user: UserModel;
}

function UserDetails(props: userProps): JSX.Element {
  return (
    <Paper elevation={12}>
      <Box paddingX={2} paddingY={1}>
        <Typography variant="h4" component="h2">
          {props.user.name}
        </Typography>
        <Typography variant="h4" component="h2">
          {props.user.lastName}
        </Typography>
        <Typography variant="h4" component="h2">
          {props.user.email}
        </Typography>
        <Typography variant="h4" component="h2">
          {props.user.password}
        </Typography>
      </Box>
    </Paper>
  );
}

export default UserDetails;
