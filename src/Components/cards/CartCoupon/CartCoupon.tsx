import { Button, Card, Typography } from "@mui/material";
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
  const [coupon, setCoupon] = useState<CouponModel>({ ...new CouponModel() });
  const { removeItem } = useActions();

  /**
   * Checks the coupon in the database by the coupon id
   * returns the coupon if its valid for purchase
   * @param {CouponModel} coupon - the coupon to be removed
   */
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
      <Card sx={{ margin: "1vh" }}>
        <Typography>{coupon.title}</Typography>
        <Typography>{coupon.description}</Typography>
        <Typography>{coupon.price}</Typography>
        <Button
          onClick={() => {
            removeItem(props.coupon);
          }}
        >
          Remove Item
        </Button>
      </Card>
    </div>
  );
}

export default CartCoupon;
