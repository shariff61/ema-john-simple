import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product, handleAddProduct }) => {
  // console.log(props.product.key);
  // const { product, handleAddProduct } = props;
  const { img, name, seller, price, stock, key } = product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">
          <Link to={`/product/${key}`}> {name}</Link>
        </h4>
        <br />
        <p>
          <small>by:{seller}</small>
        </p>
        <p>${price}</p>
        <br />
        <p>
          <small>Only {stock} left in stock..Order soon</small>
        </p>
        <br />
        {
          <button className="addBtn" onClick={() => handleAddProduct(product)}>
            add to cart
          </button>
        }
      </div>
    </div>
  );
};

export default Product;
