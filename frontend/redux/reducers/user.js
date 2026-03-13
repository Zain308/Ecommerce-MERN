import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "../actions/user";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ──────────────── Clear Errors ────────────────
    clearErrors: (state) => {
      state.error = null;
    },
  },
  // ──────────────── Load User Async Handlers ────────────────
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload; // Pulled directly from the thunk's return
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload; // Pulled from rejectWithValue
      });
  },
});

// Export the synchronous actions (like clearErrors)
export const { clearErrors } = userSlice.actions;

// Export the reducer to be used in the store
export const userReducer = userSlice.reducer;