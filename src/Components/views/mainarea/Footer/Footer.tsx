import "./Footer.css";
import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Component } from "react";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      {/* <Box>
        <Container maxWidth="lg">
          <Grid container spacing={5}></Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={9}>Test Footer</Box>
          </Grid>
        </Container>
      </Box> */}
      <>
        <Box component="footer">
          <Container maxWidth="lg">
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Grid item sm={6} xs={6}>
                <Typography variant="body1" style={{ fontSize: "0.7rem" }}>
                  <CopyrightIcon fontSize="small" />
                  H.E.T.I COMPANY
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    </div>
  );
}

export default Footer;
