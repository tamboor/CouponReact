import { CouponModel } from "../../Modals/CouponModel";

function addToCart(name: string, coupon: CouponModel) {
  const key = `cart_${name}`;
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  const coupons = JSON.parse(localStorage.getItem(key) as string);
  coupons.push(coupon);
  localStorage.setItem(key, JSON.stringify(coupons));
}
