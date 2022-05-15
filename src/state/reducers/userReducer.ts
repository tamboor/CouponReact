import { CouponModel } from "../../Modals/CouponModel";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface UserState {
  userRole: string;
  userName: string;
  cart: CouponModel[];
}

const cartInit: CouponModel[] = [] as CouponModel[];

const initialState: UserState = {
  userRole: "guest",
  userName: "Guest",
  cart: cartInit as CouponModel[],
} as UserState;

const reducer = (
  state: UserState = initialState as UserState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.ADMIN_LOGIN:
      return {
        ...state,
        userRole: "admin",
        userName: "Admin",
        cart: state.cart as CouponModel[],
      } as UserState;
    case ActionType.CUSTOMER_LOGIN:
      return {
        ...state,
        userRole: "customer",
        userName: action.payload.userName,
        cart: state.cart as CouponModel[],
      } as UserState;
    case ActionType.COMPANY_LOGIN:
      return {
        ...state,
        cart: state.cart as CouponModel[],
        userRole: "company",
        userName: action.payload.userName,
      } as UserState;
    case ActionType.LOGOUT:
      return {
        ...state,
        userRole: "guest",
        userName: "Guest",
        cart: state.cart as CouponModel[],
      } as UserState;
    case ActionType.ADD_ITEM:
      const newState: UserState = { ...state };
      newState.cart.push(action.payload.coupon);
      return newState as UserState;
    case ActionType.REMOVE_ITEM:
      const currState: UserState = { ...state };
      const removeIndex = currState.cart.indexOf(action.payload.coupon);
      if (removeIndex > -1) {
        currState.cart.splice(removeIndex, 1);
      }
      return currState as UserState;
    case ActionType.CLEAR_CART:
      return { ...state, cart: [] } as UserState;
    /**
     *
     */
    case ActionType.CLEAR_REDUX:
      console.log("cleared state");
      return initialState as UserState;
    default:
      return state;
  }
};

//TODO: clear cart on logout/login - most preferably on user switch

export default reducer;
