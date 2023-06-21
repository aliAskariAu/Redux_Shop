import React, { useEffect } from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useSelector, useDispatch } from "react-redux";

const ProductList = () => {
  const {
    all_products,
    product_filtered: products,
    grid_view,
  } = useSelector((store) => store.productFilter);
  if (products.length < 1) {
    return <h5 style={{ textTransform: "none" }}>Sorry no products matched</h5>;
  }

  if (grid_view === false) {
    return <ListView products={products} />;
  }

  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
