import axios from "axios";
import { Dispatch } from "redux";
import { CouponModel } from "../../Modals/CouponModel";
import { ActionType } from "../action-types";
import { Action } from "../actions";

//todo: check if can add a helper method, read about async await.
export const tryAdminLogin = (userName: string, userPass: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const url = `http://localhost:8080/admin/login`;
    // const url = `http://localhost:8080/admin/login`;
    try {
      const { headers } = await axios.post(url, {
        role: "admin",
        userName: userName,
        userPass: userPass,
      });

      localStorage.setItem("token", headers.authorization);
      dispatch({
        type: ActionType.ADMIN_LOGIN,
      });
    } catch (err: any) {
      localStorage.removeItem("token");

      dispatch({
        type: ActionType.LOGOUT,
        payload: err?.message,
      });
    }
  };
};

export const tryCompanyLogin = (userName: string, userPass: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const url = `http://localhost:8080/company/login`;
    try {
      const { headers } = await axios.post(url, {
        role: "company",
        userName: userName,
        userPass: userPass,
      });

      localStorage.setItem("token", headers.authorization);
      dispatch({
        type: ActionType.COMPANY_LOGIN,
        payload: {
          userName,
        },
      });
    } catch (err: any) {
      localStorage.removeItem("token");

      dispatch({
        type: ActionType.LOGOUT,
        payload: err?.message,
      });
    }
  };
};

export const tryCustomerLogin = (userName: string, userPass: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const url = `http://localhost:8080/customer/login`;
    try {
      const { headers } = await axios.post(url, {
        role: "customer",
        userName: userName,
        userPass: userPass,
      });

      localStorage.setItem("token", headers.authorization);

      dispatch({
        type: ActionType.CUSTOMER_LOGIN,
        payload: {
          userName,
        },
      });
      console.log(headers);
    } catch (err: any) {
      localStorage.removeItem("token");

      dispatch({
        type: ActionType.LOGOUT,
        payload: err?.message,
      });
    }
  };
};

export const tryLogout = (err?: Error) => {
  return async (dispatch: Dispatch<Action>) => {
    localStorage.removeItem("token");

    dispatch({
      type: ActionType.LOGOUT,
      payload: err?.message,
    });
  };
};

export const addItem = (coupon: CouponModel) => {
  // dispatch({type:ActionType.ADD_ITEM , payload:});
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ADD_ITEM, payload: { coupon: coupon } });
  };
};

export const removeItem = (coupon: CouponModel) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_ITEM, payload: { coupon } });
  };
};

export const clearCart = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_CART });
  };
};
