import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { CouponModel } from "../../../Models/CouponModel";
import globals, { host } from "../../../utils/globals";
import notify from "../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import "./CartCoupon.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
      .get(`${host}/customer/checkCoupon`, getAuthHeaders())
      .then((res) => {
        setStoredToken(res);
        setCoupon(res.data);
      })
      .catch((error) => {
        // notify.error(error.response.data.description);
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
    <Grid item key={props.coupon.id} xs={12} sm={12} md={4} xl={2.4} lg={3}>
      <Card
        sx={{
          height: "60vh",
          display: "flow",
          flexDirection: "column",
          ...(couponError.error && couponError.styles),
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            height: "40%",
            paddingTop: "0%",
            paddingBottom: "0%",
          }}
          image={props.coupon.image}
          alt="coupon img"
        />

        <CardContent>
          {couponError.error !== null && (
            <Typography color={"red"}>{couponError.error}</Typography>
          )}
          <Typography gutterBottom variant="h5" component="h2">
            {props.coupon.title}
          </Typography>

          {!couponError.error && (
            <div>
              <Typography>{props.coupon.description}</Typography>
              <Typography gutterBottom variant="h6" component="h2">
                {props.coupon.price}{" "}
                <AttachMoneyIcon
                  sx={{
                    width: "2rem",
                    marginRight: 0.5,
                  }}
                />
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions sx={{ position: "relative", alignContent: "flex-end" }}>
          <Button
            onClick={() => {
              removeItem(props.coupon);
            }}
          >
            Remove Item
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CartCoupon;
