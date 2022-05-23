import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShowCoupons from "../../../views/contents/ShowCoupons/ShowCoupons";
import Login from "../../guest/Login/Login";
import CouponList from "../../../views/contents/CouponList/CouponList";
import { CouponModel } from "../../../../Models/CouponModel";
import axios, { AxiosError, AxiosResponse } from "axios";
import getAuthHeaders from "../../../../utils/tokenUtils";
import CouponBrowser from "../../../views/contents/CouponBrowser/CouponBrowser";
import { useEffect } from "react";
// import CouponList from "../CouponList/CouponList";

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
  const [companyCoupons, setCompanyCoupons] = React.useState<CouponModel[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function fetchCoupons() {
    axios
      .get("http://localhost:8080/company/getCompanyCoupons", getAuthHeaders())
      .then((res: AxiosResponse) => {
        setCompanyCoupons(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

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
      {/* </Box> */}
      <TabPanel value={value} index={0}>
        <CouponBrowser allCoupons={companyCoupons} />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Box>
  );
}
