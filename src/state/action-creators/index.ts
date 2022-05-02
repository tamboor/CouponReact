import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
//todo: check if can add a helper method, read about async await.
const tryAdminLogin = (userName: string, userPass: string) => {
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
    } catch (err) {
      dispatch({
        type: ActionType.LOGOUT,
        payload: err.message,
      });
    }
  };
};

const tryCompanyLogin = (userName: string, userPass: string) => {
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
      dispatch({
        type: ActionType.LOGOUT,
        payload: err.message,
      });
    }
  };
};

const tryCustomerLogin = (userName: string, userPass: string) => {
  return async (dispatch: any) => {
    const url = `http://localhost:8080/customer/login`;
    try {
      const { headers } = await axios.post(url, {
        role: "customer",
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
      dispatch({
        type: ActionType.LOGOUT,
        payload: err.message,
      });
    }
  };
};

const tryLogout = (err?: Error) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.LOGOUT,
      payload: err?.message,
    });
  };
};
