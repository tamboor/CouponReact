import "./Routing.css";
import ShowCoupons from "../contents/ShowCoupons/ShowCoupons";
import Notfound from "../contents/notfound/notfound";
import { Route, Routes } from "react-router-dom";
import UserInfo from "../contents/UserInfo/UserInfo";
import Cart from "../contents/Cart/Cart";
import CompanyHomepage from "../contents/CompanyHomepage/CompanyHomepage";
import ManageUsers from "../../user-specific/admin/ManageUsers/ManageUsers";
import Login from "../../user-specific/guest/Login/Login";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/purchase-coupons" element={<Cart />} />
        <Route path="/my-account" element={<UserInfo />} />
        <Route path="/company-home" element={<CompanyHomepage />} />
        <Route path="/show-coupons" element={<ShowCoupons />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default Routing;

//TODO: add 404 to * route
