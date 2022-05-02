import axios from "axios";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const tryAdminLogin = (userName: string, userPass: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.ADMIN_LOGIN,
    });

    const url = `http://localhost:8080/admin/login`;
    // const url = `http://localhost:8080/admin/login`;
    try {
      const { headers } = await axios.post(url, {
        role: "admin",
        userName: userName,
        userPass: userPass,
      });

      localStorage.setItem("token", headers.authorization);
    } catch (err) {}
    //   .then((response) => {
    //     console.log(response.headers.authorization);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

const tryCompanyLogin = (userName: string, userPass: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.COMPANY_LOGIN,
    });

    try {
    } catch (err) {
      tryLogout(err);
    }
  };
};

const tryCustomerLogin = (userName: string, userPass: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.CUSTOMER_LOGIN,
    });

    try {
    } catch (err) {
      tryLogout(err);
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
