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

function Footer(): JSX.Element {
  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ backgroundColor: colors.BLACK }}>
        <Toolbar>
          hello
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
