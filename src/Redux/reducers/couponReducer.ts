import { CouponModel } from "../../Models/CouponModel";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface CouponState {
  coupons: CouponModel[];
}

const couponsInit = [] as CouponModel[];

const initialState = { coupons: couponsInit } as CouponState;

const reducer = (
  state: CouponState = initialState,
  action: Action
): CouponState => {
  switch (action.type) {
    // case ActionType.
    case ActionType.SET_COUPONS:
      return {
        ...state,
        coupons: action.payload.coupons,
      } as CouponState;
    case ActionType.CLEAR_COUPONS:
      return initialState as CouponState;
    case ActionType.ADD_COUPON:
      const newState: CouponState = { ...state } as CouponState;
      console.log("here!!!!!!!:)");
      newState.coupons.push(action.payload.coupon);
      console.log(newState);
      return newState;
    case ActionType.REMOVE_COUPON:
      const currState: CouponState = { ...state } as CouponState;
      const removeIndex = currState.coupons.indexOf(action.payload.coupon);
      if (removeIndex > -1) {
        currState.coupons.splice(removeIndex, 1);
      }
      return currState;
    default:
      return state;
  }
};

export default reducer;
