import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { CouponModel } from "../../../Models/CouponModel";
import { getStoredToken } from "../../../utils/tokenUtils";
import "./CartCoupon.css";

interface cartItemProps {
  coupon: CouponModel;
}

interface CartCouponState {
  coupon: CouponModel;
}

interface ErrorState {
  error?: string;
  styles?: any;
}

function CartCoupon(props: cartItemProps): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel>({ ...new CouponModel() });
  // const [valid , setValid] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<ErrorState>({});
  const { removeItem } = useActions();

  // const extraStyles: any = {};

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
        //TODO: make better 401 response in backend
        setCouponError({
          error: error.response.data.description,
          styles: {
            border: 1,
            borderColor: "red",
          },
        });
      });
  }, []);

  return (
    <div className="CartCoupon">
      <Card
        sx={{
          margin: "1vh  ",
          ...(couponError.error && couponError.styles),
        }}
      >
        {couponError.error !== null && (
          <Typography color={"red"}>{couponError.error}</Typography>
        )}
        <Typography>{props.coupon.title}</Typography>
        {!couponError.error && (
          <div>
            <Typography>{coupon.description}</Typography>
            <Typography>{coupon.price}</Typography>
          </div>
        )}
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
