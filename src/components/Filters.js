import React from "react";
import styled from "styled-components";
import {
  clearFilters,
  filterProducts,
  updateFiltersHandler,
} from "../features/filterSlice";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {
  const {
    product_filtered,
    all_products,
    grid_view,
    sort,
    filters: {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
  } = useSelector((store) => store.productFilter);
  const dispatch = useDispatch();
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    console.log(`Updating filter: ${name} to value: ${value}`);
    dispatch(updateFiltersHandler({ name, value }));
    dispatch(filterProducts());
  };

  const updateClearFilters = () => {
    dispatch(clearFilters());
  };

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");
  console.log(colors);
  return (
    <Wrapper>
      <h4>filters</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input
            type="text"
            name="text"
            placeholder="search"
            value={text}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control">
          <h5>Category</h5>
          <div>
            {categories.map((categoryItem, index) => {
              return (
                <button
                  type="button"
                  name="category"
                  value={category}
                  className={`${
                    category === categoryItem.toLowerCase() ? "active" : null
                  }`}
                  onClick={updateFilters}
                >
                  {categoryItem}
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>Company</h5>
          <select
            name="company"
            id="company"
            value={company}
            onChange={updateFilters}
            className="company"
          >
            {companies.map((companyName, index) => {
              return (
                <option key={index} value={companyName}>
                  {companyName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <h5>Colors</h5>
          {colors.map((colorItem, index) => {
            if (colorItem === "all") {
              return (
                <button
                  name="color"
                  onClick={updateFilters}
                  data-color="all"
                  className={`${
                    color === "all" ? "all-btn active" : "all-btn"
                  }`}
                >
                  all
                </button>
              );
            }
            return (
              <button
                type="button"
                name="color"
                key={index}
                value={color}
                onClick={updateFilters}
                className={`${
                  color === colorItem ? "color-btn active" : "color-btn"
                }`}
                data-color={colorItem}
                style={{ background: colorItem }}
              >
                {color === colorItem ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
        <div className="form-control">
          <h5>Price</h5>
          <p>{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            value={price}
            min={min_price}
            max={max_price}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control shipping">
          <label htmlFor="shipping">Free Shipping</label>
          <input
            type="checkbox"
            id="shipping"
            name="shipping"
            value={shipping}
            checked={shipping}
            onChange={updateFilters}
          />
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
