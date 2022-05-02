import { ActionType } from "../action-types";
import { Action } from "../actions";

interface UserState {
  userRole: string;
  //userId: number;
  userName: string;
}

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case ActionType.ADMIN_LOGIN:
      return {
        userRole: "admin",
        //userId: 0,
        userName: "Admin",
      };
    case ActionType.CUSTOMER_LOGIN:
      return {
        userRole: "customer",
        //userId: action.payload.userId,
        userName: action.payload.userName,
      };
    case ActionType.COMPANY_LOGIN:
      return {
        userRole: "company",
        //userId: action.payload.userId,
        userName: action.payload.userName,
      };
    case ActionType.LOGOUT:
      //userId: -1
      return { userRole: "guest", userName: "Guest" };
    default:
      return state;
  }
};

export default reducer;
