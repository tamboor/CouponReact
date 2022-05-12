import { CouponModel } from "../../Modals/CouponModel";
import { ActionType } from "../action-types";

interface AdminLoginAction {
  type: ActionType.ADMIN_LOGIN;
}

interface CustomerLoginAction {
  type: ActionType.CUSTOMER_LOGIN;
  payload: {
    // userId: number;
    userName: string;
  };
}

interface CompanyLoginAction {
  type: ActionType.COMPANY_LOGIN;
  payload: {
    //  userId: number;
    userName: string;
  };
}
interface LogoutAction {
  type: ActionType.LOGOUT;
  payload?: string;
}

interface AddItemAction {
  type: ActionType.ADD_ITEM;
  payload: {
    coupon: CouponModel;
  };
}
interface RemoveItemAction {
  type: ActionType.REMOVE_ITEM;
  payload: {
    coupon: CouponModel;
  };
}
interface ClearCartAction {
  type: ActionType.CLEAR_CART;
}

export type Action =
  | AdminLoginAction
  | CustomerLoginAction
  | CompanyLoginAction
  | LogoutAction
  | AddItemAction
  | RemoveItemAction
  | ClearCartAction;
