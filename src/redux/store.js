import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSclice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
