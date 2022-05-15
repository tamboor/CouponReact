import "./Routing.css";
// import { Login, Route } from "@mui/icons-material";
import ShowCoupons from "../contents/ShowCoupons/ShowCoupons";
import Notfound from "../contents/notfound/notfound";
// import { Route, Routes } from "react-router-dom";
import Login from "../contents/Login/Login";
import { Route, Routes } from "react-router-dom";
import UserInfo from "../contents/UserInfo/UserInfo";
import CouponPurchase from "../contents/CouponPurchase/CouponPurchase";
<<<<<<< HEAD
import ManageUsers from "../admin/ManageUsers/ManageUsers";
import CompanyHomepage from "../contents/CompanyHomepage/CompanyHomepage";
=======
import ManageUsers from "../contents/ManageUsers/ManageUsers";
import CompanyHomepage from "../contents/CompanyHomepage/CompanyHomepage";
>>>>>>> aa329ebcbb1b2b8230c8d1899de9c2c75b63d9ae
// import { Switch } from "react-router-dom";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/purchase-coupons" element={<CouponPurchase />} />
        <Route path="/my-account" element={<UserInfo />} />
        <Route path="/company-home" element={<CompanyHomepage />} />
        {/* <Route path="/show-coupons/:verb/:filter" element={<ShowCoupons />} /> */}
        <Route path="/show-coupons" element={<ShowCoupons />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default Routing;

//TODO: add 404 to * route
