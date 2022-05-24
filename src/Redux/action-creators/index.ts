import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { CompanyModel } from "../../Models/CompanyModel";
import { CouponModel } from "../../Models/CouponModel";
import { CustomerModel } from "../../Models/CustomerModel";
import { UserModel } from "../../Models/UserModel";
import getAuthHeaders from "../../utils/tokenUtils";
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
  // return (dispatch: Dispatch<Action>) => {
  //   const url = `http://localhost:8080/company/login`;
  //   axios
  //     .post(url, { role: "company", userName: userName, userPass: userPass })
  //     .then((res) => {
  //       localStorage.setItem("token", res.headers.authorization);
  //       dispatch({
  //         type: ActionType.COMPANY_LOGIN,
  //         payload: {
  //           userName,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       localStorage.removeItem("token");

  //       dispatch({
  //         type: ActionType.LOGOUT,
  //         payload: err?.message,
  //       });
  //     });
  // };
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

export const clearRedux = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_REDUX });
  };
};

export const addCustomer = (customer: CustomerModel) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_CUSTOMER,
      payload: { customer: customer },
    });
  };
};

export const removeCustomer = (customerID: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE_CUSTOMER,
      payload: { customerID: customerID },
    });
  };
};

export const addCompany = (company: CompanyModel) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ADD_COMPANY, payload: { company: company } });
  };
};

export const removeCompany = (companyID: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE_COMPANY,
      payload: { companyID: companyID },
    });
  };
};

export const clearAdminState = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_ADMIN_STATE });
  };
};

export const setCompanies = (companies: CompanyModel[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_COMPANIES, payload: { companies } });
  };
};

export const setCustomers = (customers: CustomerModel[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_CUSTOMERS, payload: { customers } });
  };
};

export const addCoupon = (coupon: CouponModel) => {
  // dispatch({type:ActionType.ADD_ITEM , payload:});
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ADD_COUPON, payload: { coupon: coupon } });
  };
};

export const removeCoupon = (coupon: CouponModel) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_COUPON, payload: { coupon } });
  };
};

export const setCoupons = (coupons: CouponModel[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_COUPONS, payload: { coupons } });
  };
};

export const clearCoupons = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_COUPONS });
  };
};
