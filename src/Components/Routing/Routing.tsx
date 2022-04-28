import "./Routing.css";
// import { Login, Route } from "@mui/icons-material";
import Allcoupons from "../contents/allcoupons/allcoupons";
import Notfound from "../contents/notfound/notfound";
// import { Route, Routes } from "react-router-dom";
import Login from "../contents/Login/Login";
import { Route, Routes } from "react-router-dom";
// import { Switch } from "react-router-dom";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Login />
        </Route> */}
        <Route path="/" element={<Allcoupons />} />
        {/* <Allcoupons />
        </Route> */}
        <Route path="*" element={<Notfound />} />
        {/* <Notfound />
        </Route> */}
      </Routes>
    </div>
  );
}

export default Routing;
