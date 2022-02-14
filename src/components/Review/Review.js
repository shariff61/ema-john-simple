import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";

import { fakeAllData } from "../fakeData/FakeData";

import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const removeItems = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  const products = fakeAllData.slice(0, 10);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map((key) => {
      const product = products.find((pd) => pd.key === key);
      // console.log(product);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  const [orderPlace, setOrderPlace] = useState(false);
  const handleProceedCheckout = () => {
    navigate("/shipment");
  };

  let thankyou;
  if (orderPlace) {
    thankyou = <img src={happyImage} alt="" />;
  }
  return (
    <div className="twin">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeItems={removeItems}
            product={pd}
          ></ReviewItem>
        ))}
        {thankyou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="addBtn">
            Proceed checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
