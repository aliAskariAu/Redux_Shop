import React, { useEffect } from "react";
import styled from "styled-components";
import { Filters, ProductList, Sort, PageHero } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";

const ProductsPage = () => {
  const featuredProducts = useSelector(
    (store) => store.products.featured_products
  );

  const filters = useSelector((store) => store.productFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { all_products, product_filtered } = useSelector(
    (store) => store.productFilter
  );

  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
