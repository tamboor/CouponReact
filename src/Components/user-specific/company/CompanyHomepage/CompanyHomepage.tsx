import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CouponModel } from "../../../../Models/CouponModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import getAuthHeaders from "../../../../utils/tokenUtils";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import { useEffect } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import {
  setDeleteFunction,
  setRefreshFunction,
} from "../../../../utils/fetchCompanyCoupons";
import { host } from "../../../../utils/globals";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { users } = useTypedSelector((state) => state);
  const [coupons, setCoupons] = React.useState<CouponModel[]>(
    [] as CouponModel[]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function fetchCoupons() {
    console.log("fetchCoupons");

    axios
      .get(`${host}/company/getCompanyCoupons`, getAuthHeaders())
      .then((res: AxiosResponse) => {
        setCoupons(res.data as CouponModel[]);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }

  setRefreshFunction(() => {
    fetchCoupons();
  });

  setDeleteFunction((c: CouponModel) => {
    const newCoupons = coupons.filter((coupon) => coupon.id !== c.id);
    setCoupons(newCoupons);
  });

  //todo: change to userrole enum
  useEffect(() => {
    if (users.userRole !== "company") return;
    fetchCoupons();
  }, [users.userRole]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
      >
        <Tab label="My Coupons" {...a11yProps(0)} />
        <Tab label="Add Coupon" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CouponBrowser allCoupons={coupons} />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Box>
  );
}
