import { Box, Button, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import { host } from "../../../../utils/globals";
import notify from "../../../../utils/Notify";
import getAuthHeaders, {
  getStoredToken,
  setStoredToken,
} from "../../../../utils/tokenUtils";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import FeaturedCoupons from "../FeaturedCoupons/FeaturedCoupons";
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

  //TODO: handle errors
  function fetchCoupons(): void {
    console.log(getStoredToken());

    axios
      .get(`${host}/guest/getAllCoupons`)
      .then((response: AxiosResponse) => {
        setAllCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
        notify.error(error.response.data.description);
        console.log(error);
      });
  }
  function fetchCustomerCoupons(): void {
    axios
      .get(`${host}/customer/getCustomerCoupons`, getAuthHeaders())
      .then((response: AxiosResponse) => {
        setCustomerCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
        notify.error(error.response.data.description);
      });
  }

  return (
    <div className="customerHomepage">
      {browse ? (
        <Box>
          <Button onClick={openMyCoupons}>My Coupons</Button>
          {/* <FeaturedCoupons allCoupons={allCoupons} /> */}
          <CouponBrowser
            allCoupons={allCoupons}
            customerCoupons={customerCoupons}
          />
        </Box>
      ) : (
        <Box>
          <Button onClick={openBrowser}>Coupon Browser</Button>
          <MyCoupons coupons={customerCoupons} />
        </Box>
      )}
    </div>
  );
}

export default CustomerHomepage;
