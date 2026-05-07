import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("productCreateRequest", (state) => {
            state.isLoading = true;
            state.success = false; 
            state.error = null;   
        })
        .addCase("productCreateSuccess", (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
            state.success = true;
        })
        .addCase("productCreateFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase("getAllProductsShopRequest",(state)=>{
            state.isLoading = true;
        })
        .addCase("getAllProductsShopSuccess",(state,action)=>{
            state.isLoading = false;
            state.products = action.payload; // FIX 2: Changed from allProducts to products!
        })
        .addCase("getAllProductsShopFailed",(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase("deleteProductRequest",(state,action)=>{
            state.isLoading = true;
        })
        .addCase("deleteProductSuccess",(state,action)=>{
            state.isLoading = false;
            state.message = action.payload
        })
        .addCase("deleteProductFailed",(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        });
});