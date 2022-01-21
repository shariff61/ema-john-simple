import React from "react";

import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }
  const tax = (total / 10).toFixed(2);
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);
  const formatNumber = (num) => {
    const preceice = num.toFixed(2);
    return Number(preceice);
  };
  return (
    <div>
      <h3 className="text-primary">this is cart</h3>
      <h4 className="bg-success">Item Orderd: {cart.length}</h4>
      <p>product price: {formatNumber(total)}</p>
      <p>
        <small>Shipping: {shipping}</small>
      </p>
      <p>
        <small>tax+vat: {tax}</small>
      </p>
      <p> total price: {grandTotal}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
