import React from "react";

const ReviewItem = (props) => {
  // console.log(props);
  const { name, price, quantity, key } = props.product;
  // console.log(props.product);
  const reviewItemStyle = {
    borderBottom: "1px solid gray",
    marginBottom: "8px",
    paddingBottom: "8px",
    marginLeft: "200px",
  };
  const removeItems = props.removeItems;
  return (
    <div style={reviewItemStyle}>
      <h3>this is review item</h3>
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <br />
      <button onClick={() => removeItems(key)} className="addBtn">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
