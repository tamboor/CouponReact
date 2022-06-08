import "./GuestHomepage.css";
import HomeImage from "../../../../Assets/images/guest_2.png";
import { Box, Grid } from "@mui/material";
import { colors } from "../../../../utils/colors";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import { host } from "../../../../utils/globals";
import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../../Models/CouponModel";
import CouponList from "../../../views/contents/CouponList/CouponList";

function GuestHomepage(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    const url = `${host}/guest/getAllCoupons`;
    axios
      .get(url)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="GuestHomepage">
      <Box sx={{ backgroundColor: colors.CYAN }}>
        <Box
          sx={{
            height: "70vh",
            marginX: "10vh",
            backgroundImage: `url(${HomeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
      <Box marginX={"4vh"} marginY={"2vh"}>
        <CouponList coupons={coupons.slice(0, 24)} ignoredCoupons={[]} />
      </Box>
    </div>
  );
}

export default GuestHomepage;
