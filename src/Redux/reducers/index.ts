import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  users: userReducer,
  admin: adminReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
