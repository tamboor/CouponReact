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

function Footer(): JSX.Element {
  return (
    // // <div className="Footer">
    //   {/* <Box>
    //     <Container maxWidth="lg">
    //       <Grid container spacing={5}></Grid>
    //       <Grid item xs={12} sm={4}>
    //         <Box borderBottom={9}>Test Footer</Box>
    //       </Grid>
    //     </Container>
    //   </Box> */}
    //   <>
    //     {/* <Box component="footer">
    //       <Container maxWidth="lg">
    //         <Grid
    //           container
    //           spacing={2}
    //           sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignContent: "center",
    //           }}
    //         >
    //           <Grid item sm={6} xs={6}>
    //             <Typography variant="body1" style={{ fontSize: "0.7rem" }}>
    //               <CopyrightIcon fontSize="small" />
    //               H.E.T.I COMPANY
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //       </Container>
    //     </Box> */}
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
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
