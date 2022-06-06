import "./Routing.css";
import Notfound from "../contents/notfound/notfound";
import { Route, Router, Routes } from "react-router-dom";
import UserInfo from "../contents/UserInfo/UserInfo";
import Cart from "../../user-specific/customer/Cart/Cart";
import Login from "../../user-specific/guest/Login/Login";
import CompanyHomepage from "../../user-specific/company/CompanyHomepage/CompanyHomepage";
import CustomerHomepage from "../../user-specific/customer/CustomerHomepage/CustomerHomepage";
import AdminHomepage from "../../user-specific/admin/AdminHomepage/AdminHomepage";
import GuestHomepage from "../../user-specific/guest/GuestHomepage/GuestHomepage";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<GuestHomepage />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/purchase-coupons" element={<Cart />} />
        <Route path="/my-account" element={<UserInfo />} />
        <Route path="/company-home" element={<CompanyHomepage />} />
        <Route path="/customer-home" element={<CustomerHomepage />} />
        <Route path="/admin-home" element={<AdminHomepage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default Routing;

//TODO: add 404 to * route
