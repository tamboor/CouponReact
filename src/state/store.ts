import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
