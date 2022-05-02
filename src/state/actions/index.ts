import { ActionType } from "../action-types";

interface AdminLoginAction {
  type: ActionType.ADMIN_LOGIN;
}

interface CustomerLoginAction {
  type: ActionType.CUSTOMER_LOGIN;
  payload: {
    userId: number;
    userName: string;
  };
}

interface CompanyLoginAction {
  type: ActionType.COMPANY_LOGIN;
  payload: {
    userId: number;
    userName: string;
  };
}
interface LogoutAction {
  type: ActionType.LOGOUT;
}

export type Action =
  | AdminLoginAction
  | CustomerLoginAction
  | CompanyLoginAction
  | LogoutAction;
