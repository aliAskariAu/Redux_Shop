import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productSlice";
const initialState = {
  product_filtered: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  max_price: 0,
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filterSlice = createSlice({
  name: "filtered",
  initialState,
  reducers: {
    setAllProducts: (state, { payload }) => {
      state.all_products = payload;
    },
    setFilteredProducts: (state, { payload }) => {
      state.product_filtered = payload;
    },
    setGridView: (state) => {
      state.grid_view = true;
    },
    setListView: (state) => {
      state.grid_view = false;
    },

    sortUpdate: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    updateFiltersHandler: (state, { payload }) => {
      state.filters[payload.name] = payload.value;
      console.log(state.filters.text);
    },
    clearFilters: (state) => {
      const maxPrice = state.max_price;
      Object.assign(state, initialState);
      state.price = maxPrice;
      state.max_price = maxPrice;
    },
    filterProducts: (state) => {
      let tempProducts = [...state.all_products];
      const { text, category, company, color, price, shipping } = state.filters;
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().includes(text.toLowerCase());
        });
      }
      // Filter by Category
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      // Filter by Company
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      // Filter by Colors
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          console.log(product.colors);
          return product.colors.find((c) => c === color);
        });
      }

      // Filter by Price

      tempProducts = tempProducts.filter((product) => {
        return product.price <= price;
      });

      // Filter by Shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === true;
        });
      }

      state.product_filtered = tempProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.all_products = payload.all;
      state.product_filtered = payload.all;
      let maxPrice = Math.max(...payload.all.map((p) => p.price));
      console.log(maxPrice);
      state.max_price = maxPrice;
      state.filters.max_price = maxPrice;
      state.filters.price = maxPrice;
    });
  },
});

export const {
  setAllProducts,
  setFilteredProducts,
  setListView,
  setGridView,
  sortUpdate,
  updateFiltersHandler,
  clearFilters,
  filterProducts,
} = filterSlice.actions;
export default filterSlice.reducer;
