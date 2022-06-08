import "./Footer.css";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import React, { Component } from "react";
import { colors } from "../../../../utils/colors";
import { useNavigate } from "react-router-dom";

function Footer(): JSX.Element {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ backgroundColor: colors.BLACK }}>
        <Toolbar>
          <Typography
            onClick={() => {
              navigate("/AboutUs");
            }}
            sx={{
              flexGrow: 1,
              fontFamily: "Abril Fatface",
              "&:hover": { cursor: "pointer" },
            }}
          >
            About us
          </Typography>
          {/* <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <StyledFab color="secondary" aria-label="add">
              <AddIcon />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
    // </>
    // {/* </div> */}
  );
}

export default Footer;
