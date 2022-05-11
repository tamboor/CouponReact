import { Box, Button } from "@mui/material";
import "./ManageUsersButton.css";

function ManageUsersButton(): JSX.Element {
  return (
    <Box>
      <Button color="inherit" href="/manage-users">
        Manage Users
      </Button>
    </Box>
  );
}

export default ManageUsersButton;
