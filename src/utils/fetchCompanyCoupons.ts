import { CouponModel } from "../Models/CouponModel";

let fetchFunc: () => void = () => {};
let deleteFunc: (c: CouponModel) => void = (c) => {};

export function setRefreshFunction(func: () => void) {
  fetchFunc = func;
}

export function setDeleteFunction(func: (c: CouponModel) => void) {
  deleteFunc = func;
}

export function refetchCoupons() {
  fetchFunc();
}

export function deleteCoupon(c: CouponModel) {
  deleteFunc(c);
}
