import Coupon from "../../cards/Coupon/Coupon";
import Allcoupons from "../../contents/allcoupons/allcoupons";
import allcoupons from "../../contents/allcoupons/allcoupons";
import Login from "../../contents/Login/Login";
import Routing from "../../Routing/Routing";
import Content from "../Content/Content";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      {/* <div className="Content">
            <Content />
            </div> */}

      {/* <Coupon /> */}
      {/* <Allcoupons /> */}
      <Routing />
    </div>
  );
}

export default Main;
