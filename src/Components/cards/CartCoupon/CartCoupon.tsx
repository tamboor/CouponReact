import { Button, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { CouponModel } from "../../../Modals/CouponModel";
import { getStoredToken } from "../../utils/tokenUtils";
import "./CartCoupon.css";

interface cartItemProps {
  coupon: CouponModel;

  //   coupon?: CouponModel;
}

// interface CartItemState {
// //   valid: boolean;
// //   message?: string;
//   coupon?: CouponModel;
// }

function CartCoupon(props: cartItemProps): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel | null>();
  const { removeItem } = useActions();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/checkCoupon/${props.coupon.id}`, {
        headers: { Authorization: getStoredToken() },
      })
      .then((res) => {
        //   const data: CartItemState = res.data;
        //   if (data.valid) {
        //     setCoupon({ valid: true, coupon: data.coupon });
        //   } else {
        //     setCoupon({ valid: false, message: data.message });
        //   }
        setCoupon(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="CartCoupon">
      <Button
        onClick={() => {
          removeItem(props.coupon);
        }}
      >
        Remove Item
      </Button>
      {/* <p>{props.coupon.title}</p>
      <p>{props.coupon.price}</p> */}
      <Card></Card>
    </div>
  );
}

export default CartCoupon;
