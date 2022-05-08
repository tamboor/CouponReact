import "./Routing.css";
// import { Login, Route } from "@mui/icons-material";
import ShowCoupons from "../contents/ShowCoupons/ShowCoupons";
import Notfound from "../contents/notfound/notfound";
// import { Route, Routes } from "react-router-dom";
import Login from "../contents/Login/Login";
import { Route, Routes } from "react-router-dom";
import UserInfo from "../contents/UserInfo/UserInfo";
// import { Switch } from "react-router-dom";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<UserInfo />} />
        <Route path="/show-coupons/:verb/:filter" element={<ShowCoupons />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default Routing;

//TODO: add 404 to * route
