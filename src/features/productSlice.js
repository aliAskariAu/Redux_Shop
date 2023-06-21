import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products_url as url, single_product_url } from "../utils/constants";
import axios from "axios";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(url);
      const featuredProducts = response.data.filter(
        (product) => product.featured === true
      );
      return { all: response.data, featured: featuredProducts };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/singleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(`${single_product_url}${productId}`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    openSidebar: (state, { payload }) => {
      state.isSidebarOpen = true;
    },

    closeSidebar: (state, { payload }) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products_loading = true;
        state.products_error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products_loading = false;
        state.products = payload.all;
        state.featured_products = payload.featured;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.products_loading = false;
        state.products_error = true;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.single_product_loading = true;
        state.single_product_error = false;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
        state.single_product_loading = false;
        state.single_product_error = false;
        state.single_product = payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, { payload }) => {
        state.single_product_loading = false;
        state.single_product_error = true;
      });
  },
});

export const { openSidebar, closeSidebar } = productsSlice.actions;
export default productsSlice.reducer;
