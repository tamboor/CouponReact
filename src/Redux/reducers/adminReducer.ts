import { ActionTypes } from "@mui/base";
import { CompanyModel } from "../../Models/CompanyModel";
import { CustomerModel } from "../../Models/CustomerModel";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface AdminState {
  customers: CustomerModel[];
  companies: CompanyModel[];
}

const initialState: AdminState = {
  customers: [] as CustomerModel[],
  companies: [] as CompanyModel[],
};

const adminReducer = (state: AdminState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_CUSTOMER:
      return {
        ...state,
        customers: [
          ...state.customers,
          action.payload.customer as CustomerModel,
        ] as CustomerModel[],
      };
    case ActionType.REMOVE_CUSTOMER:
      console.log("state before: ");
      console.log(state);
      const workingCustomers = state.customers.filter(
        (customer) => customer.id !== action.payload.customerID
      );
      console.log("state after: ");
      console.log(workingCustomers);
      return {
        ...state,
        customers: workingCustomers as CustomerModel[],
      };
    case ActionType.ADD_COMPANY:
      return {
        ...state,
        companies: [
          ...state.companies,
          action.payload.company as CompanyModel,
        ] as CompanyModel[],
      };
    case ActionType.REMOVE_COMPANY:
      console.log("state before: ");
      console.log(state);
      const workingCompanies = state.companies.filter(
        (company) => company.id !== action.payload.companyID
      );
      console.log("state after: ");
      console.log(workingCompanies);
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.id !== action.payload.companyID
        ) as CompanyModel[],
      };

    case ActionType.CLEAR_ADMIN_STATE:
      return initialState;
    case ActionType.SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies as CompanyModel[],
      };
    case ActionType.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload.customers as CustomerModel[],
      };
    case ActionType.REMOVE_COMPANY_BY_EMAIL:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.email !== action.payload.email
        ) as CompanyModel[],
      };

    case ActionType.REMOVE_CUSTOMER_BY_EMAIL:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.email !== action.payload.email
        ) as CustomerModel[],
      };
    default:
      return state;
  }
};

export default adminReducer;
