import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import {
  Stack,
  Paper,
  MenuList,
  MenuItem,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  IconButton,
  Avatar,
  Tooltip,
  Box,
  Divider,
  ListItemIcon,
  Menu,
} from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./UserMenu.css";

function UserMenu(): JSX.Element {
  const state = useTypedSelector((state) => state);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="My Acount">
          <IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>
              {state.users.userName[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </React.Fragment>
  );
}

export default UserMenu;
