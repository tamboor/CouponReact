import { CouponModel } from "../../Modals/CouponModel";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface UserState {
  userRole: string;
  userName: string;
  cart: CouponModel[];
}

const cartInit: CouponModel[] = [];

const initialState = {
  userRole: "guest",
  userName: "Guest",
  cart: cartInit,
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.ADMIN_LOGIN:
      return {
        ...state,
        userRole: "admin",
        userName: "Admin",
      };
    case ActionType.CUSTOMER_LOGIN:
      return {
        ...state,
        userRole: "customer",
        userName: action.payload.userName,
        cart: state.cart as CouponModel[],
      };
    case ActionType.COMPANY_LOGIN:
      return {
        ...state,
        cart: state.cart as CouponModel[],
        userRole: "company",
        userName: action.payload.userName,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        userRole: "guest",
        userName: "Guest",
        cart: state.cart as CouponModel[],
      };
    case ActionType.ADD_ITEM:
      const newState: UserState = { ...state };
      newState.cart.push(action.payload.coupon);
      return newState;
    case ActionType.REMOVE_ITEM:
      const currState: UserState = { ...state };
      const removeIndex = currState.cart.indexOf(action.payload.coupon);
      if (removeIndex > -1) {
        currState.cart.splice(removeIndex, 1);
      }
      return currState;
    case ActionType.CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

//TODO: clear cart on logout/login

export default reducer;
