import { CompanyModel } from "../../Models/CompanyModel";
import { CouponModel } from "../../Models/CouponModel";
import { CustomerModel } from "../../Models/CustomerModel";
import { UserModel } from "../../Models/UserModel";
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

interface ClearReduxAction {
  type: ActionType.CLEAR_REDUX;
}

interface AddCustomerAction {
  type: ActionType.ADD_CUSTOMER;
  payload: {
    customer: CustomerModel;
  };
}
interface RemoveCustomerAction {
  type: ActionType.REMOVE_CUSTOMER;
  payload: {
    customerID: number;
  };
}
interface AddCompanyAction {
  type: ActionType.ADD_COMPANY;
  payload: {
    company: CompanyModel;
  };
}
interface RemoveCompanyAction {
  type: ActionType.REMOVE_COMPANY;
  payload: {
    companyID: number;
  };
}
interface ClearAdminStateAction {
  type: ActionType.CLEAR_ADMIN_STATE;
}

interface SetCustomersAction {
  type: ActionType.SET_CUSTOMERS;
  payload: {
    customers: CustomerModel[];
  };
}
interface SetCompaniesAction {
  type: ActionType.SET_COMPANIES;
  payload: {
    companies: CompanyModel[];
  };
}
interface AddCouponAction {
  type: ActionType.ADD_COUPON;
  payload: {
    coupon: CouponModel;
  };
}
interface RemoveCouponAction {
  type: ActionType.REMOVE_COUPON;
  payload: {
    coupon: CouponModel;
  };
}

interface SetCouponsAction {
  type: ActionType.SET_COUPONS;
  payload: {
    coupons: CouponModel[];
  };
}
interface ClearCouponsAction {
  type: ActionType.CLEAR_COUPONS;
}

interface RemoveCompanyByEmailAction {
  type: ActionType.REMOVE_COMPANY_BY_EMAIL;
  payload: {
    email: string;
  };
}
interface RemoveCustomerByEmailAction {
  type: ActionType.REMOVE_CUSTOMER_BY_EMAIL;
  payload: {
    email: string;
  };
}
interface UpdateCustomerAction {
  type: ActionType.UPDATE_CUSTOMER;
  payload: {
    customer: CustomerModel;
  };
}
interface UpdateCompanyAction {
  type: ActionType.UPDATE_COMPANY;
  payload: {
    company: CompanyModel;
  };
}
export type Action =
  | AdminLoginAction
  | CustomerLoginAction
  | CompanyLoginAction
  | LogoutAction
  | AddItemAction
  | RemoveItemAction
  | ClearCartAction
  | ClearReduxAction
  //
  | AddCustomerAction
  | RemoveCustomerAction
  | AddCompanyAction
  | RemoveCompanyAction
  | ClearAdminStateAction
  | SetCustomersAction
  | SetCompaniesAction
  | RemoveCompanyAction
  | RemoveCustomerAction
  | RemoveCompanyByEmailAction
  | RemoveCustomerByEmailAction
  //
  | AddCouponAction
  | RemoveCouponAction
  | SetCouponsAction
  | ClearCouponsAction
  //
  | UpdateCustomerAction
  | UpdateCompanyAction;
