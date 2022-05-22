import { Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../../Models/CouponModel";
import getAuthHeaders from "../../../../utils/tokenUtils";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import "./CustomerHomepage.css";

function CustomerHomepage(): JSX.Element {
  const [allCoupons, setAllCoupons] = useState<CouponModel[]>([]);
  const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    fetchCoupons();
    fetchCustomerCoupons();
  }, []);

  //TODO: handle errors
  function fetchCoupons(): void {
    axios
      .get("http://localhost:8080/guest/getAllCoupons", getAuthHeaders())
      .then((response: AxiosResponse) => {
        setAllCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
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
        // setCustomerState({
        //   ...customerState,
        //   customerCoupons: response.data as CouponModel[],
        // });
        // console.log("success");
        setCustomerCoupons(response.data as CouponModel[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // console.log(customerState);
  return (
    <div className="customerHomepage">
      <Typography>Add featured coupons here</Typography>
      <CouponBrowser
        allCoupons={allCoupons}
        customerCoupons={customerCoupons}
      />
    </div>
  );
}

export default CustomerHomepage;