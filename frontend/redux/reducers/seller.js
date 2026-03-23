import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,      // Changed from isAuthenticated
  isLoading: true,     // Initial state as true to prevent route flickering
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;      // Consistent with App.jsx
      state.isLoading = false;
      state.seller = action.payload; // Use lowercase 'seller'
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});