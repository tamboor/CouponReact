import { Box, Button, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import { colors } from "../../../../utils/colors";
import { host } from "../../../../utils/globals";
import notify from "../../../../utils/Notify";
import getAuthHeaders, {
  getStoredToken,
  setStoredToken,
} from "../../../../utils/tokenUtils";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import MyCoupons from "../MyCoupons/MyCoupons";
import "./CustomerHomepage.css";

function CustomerHomepage(): JSX.Element {
  const [allCoupons, setAllCoupons] = useState<CouponModel[]>([]);
  const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>([]);
  const { users } = useTypedSelector((state) => state);
  const [browse, setBrowse] = useState<boolean>(true);

  const openMyCoupons = () => {
    setBrowse(false);
  };
  const openBrowser = () => {
    setBrowse(true);
  };

  //TODO: change user role to enum
  useEffect(() => {
    if (users.userRole !== "customer") return;
    fetchCoupons();
    fetchCustomerCoupons();
  }, [users.userRole]);

  function fetchCoupons(): void {
    axios
      .get(`${host}/guest/getAllCoupons`)
      .then((response: AxiosResponse) => {
        setAllCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
        notify.error(error.response.data.description);
      });
  }
  function fetchCustomerCoupons(): void {
    axios
      .get(`${host}/customer/getCustomerCoupons`, getAuthHeaders())
      .then((response: AxiosResponse) => {
        setCustomerCoupons(response.data as CouponModel[]);
        setStoredToken(response);
      })
      .catch((error) => {
        console.log(error);
        notify.error(error.response.data.description);
      });
  }

  return (
    <div className="customerHomepage">
      {browse ? (
        <Box padding={8}>
          <Button
            onClick={openMyCoupons}
            variant="contained"
            sx={{
              color: colors.WHITE,
              backgroundColor: colors.PINK,
              border: 2,
              borderColor: colors.PURPLE,
              margin: 2,
            }}
          >
            My Coupons
          </Button>
          <CouponBrowser
            allCoupons={allCoupons}
            customerCoupons={customerCoupons}
          />
        </Box>
      ) : (
        <Box padding={8}>
          <Button
            onClick={openBrowser}
            variant="contained"
            sx={{
              color: colors.WHITE,
              backgroundColor: colors.PINK,
              border: 2,
              borderColor: colors.PURPLE,
              margin: 2,
            }}
          >
            Coupon Browser
          </Button>
          <MyCoupons coupons={customerCoupons} />
        </Box>
      )}
    </div>
  );
}

export default CustomerHomepage;
