import { Box, Container, Grid } from "@mui/material";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <footer>
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={5}></Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={9}>Test Footer</Box>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
