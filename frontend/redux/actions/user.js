import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../src/server"; // Ensure this exports your base API URL

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/getuser`, {
        withCredentials: true,
      });
      return data.user; // This becomes the 'payload' in fulfilled
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user"
      ); // This becomes the 'payload' in rejected
    }
  }
);