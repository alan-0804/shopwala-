import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import API from "../api";

export const fetchPrices =
  createAsyncThunk(
    "prices/fetchPrices",
    async () => {

      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/api/prices/my",
        {
          headers: {
            Authorization: token
          }
        }
      );

      return res.data;
    }
  );

const priceSlice = createSlice({
  name: "prices",

  initialState: {
    prices: [],
    loading: false
  },

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchPrices.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchPrices.fulfilled,
        (state, action) => {

          state.loading = false;

          state.prices = action.payload;
        }
      );
  }
});

export default priceSlice.reducer;