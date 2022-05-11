import { Grid } from "@mui/material";
import "./CouponPurchase.css";

const styles = {
  backgroundColor: "#FFB6C1",
  height: "100vh",
};
//TODO: move cart to external file
function CouponPurchase(): JSX.Element {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  const userCoupons: number[] = JSON.parse(
    localStorage.getItem("cart") as string
  );

  const getCouponFromId = (num: number) => {
    return <div>coupon</div>;
  };

  return (
    <div className="CouponPurchase">
      <Grid container spacing={3}>
        <Grid item xs={9} sx={styles}>
          {userCoupons.length > 0 ? (
            userCoupons.map((n: number) => getCouponFromId(n))
          ) : (
            <p>Cart is empty</p>
          )}
        </Grid>
        <Grid item xs={3} sx={styles}>
          1asd
        </Grid>
      </Grid>
    </div>
  );
}

export default CouponPurchase;
