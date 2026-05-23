import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import API from "../api";

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",
    async () => {

      const res = await API.get("/api/items");

      return res.data;
    }
  );

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false
  },

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {

          state.loading = false;

          state.items = action.payload;
        }
      );
  }
});

export default productSlice.reducer;