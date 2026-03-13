import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Keep this false if you are passing Dates/Files through state
    }),

  // Fixed for Vite: Use import.meta.env instead of process.env
  devTools: import.meta.env.DEV, 
});

export default store;