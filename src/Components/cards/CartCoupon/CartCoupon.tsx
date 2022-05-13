import { Button, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { CouponModel } from "../../../Modals/CouponModel";
import { getStoredToken } from "../../utils/tokenUtils";
import "./CartCoupon.css";

interface cartItemProps {
  coupon: CouponModel;
}

function CartCoupon(props: cartItemProps): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel | null>();
  const { removeItem } = useActions();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/checkCoupon/${props.coupon.id}`, {
        headers: { Authorization: getStoredToken() },
      })
      .then((res) => {
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
      <Card></Card>
    </div>
  );
}

export default CartCoupon;
