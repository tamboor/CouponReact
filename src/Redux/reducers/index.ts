import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import couponReducer from "./couponReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  users: userReducer,
  admin: adminReducer,
  coupons: couponReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
