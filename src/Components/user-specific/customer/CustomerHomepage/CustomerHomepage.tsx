import { Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import notify from "../../../../utils/Notify";
import getAuthHeaders, {
  getStoredToken,
  setStoredToken,
} from "../../../../utils/tokenUtils";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import FeaturedCoupons from "../FeaturedCoupons/FeaturedCoupons";
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
  // console.log(users.userRole);
  // useEffect(() => {
  //   fetchCoupons();
  // }, []);
  //TODO: change user role to customer
  useEffect(() => {
    if (users.userRole !== "customer") return;
    fetchCoupons();
    fetchCustomerCoupons();
  }, [users.userRole]);

  //TODO: handle errors
  function fetchCoupons(): void {
    console.log(getStoredToken());

    axios
      .get("http://localhost:8080/guest/getAllCoupons")
      .then((response: AxiosResponse) => {
        // setStoredToken(response);
        setAllCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
        notify.error(error.response.data.description);
        console.log(error);
      });
  }
  function fetchCustomerCoupons(): void {
    axios
      .get(
        "http://localhost:8080/customer/getCustomerCoupons",
        getAuthHeaders()
      )
      .then((response: AxiosResponse) => {
        // console.log()
        // setStoredToken(response);
        setCustomerCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
        console.log(getStoredToken());
        notify.error(error.response.data.description);
        console.log(error);
      });
  }

  // console.log(allCoupons);
  return (
    <div className="customerHomepage">
      {}
      <FeaturedCoupons allCoupons={allCoupons} />
      <CouponBrowser
        allCoupons={allCoupons}
        customerCoupons={customerCoupons}
      />
    </div>
  );
}

export default CustomerHomepage;
