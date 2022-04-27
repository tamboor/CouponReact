import { Box, Container, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import Coupon from "../../cards/Coupon/Coupon";
import "./allcoupons.css";

function allcoupons(): JSX.Element {
    return (
        <Box paddingY={3} >
        <Container>
        <Grid container spacing={5}>
            {/* <Grid item xs={4}> */}
            <Coupon />
            <Coupon />
            <Coupon />
            <Coupon />
            <Coupon />
            <Coupon />
            {/* </Grid> */}
        {/* <div className="allcoupons">
			
        </div> */}
        </Grid>
        </Container>
        </Box>
    );
}

export default allcoupons;
