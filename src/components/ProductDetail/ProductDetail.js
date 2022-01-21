import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fakeAllData } from "../fakeData/FakeData";

import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch(
  //     "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.slice(0, 10).find((pd) => pd.key === productKey));
  //       console.log(data.slice(0, 10));
  //     });
  // }, []);
  const product = fakeAllData.find((pd) => pd.key === productKey);
  // const products = proudcts.find((pd) => pd.key === productKey);
  return (
    <div>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;

//////////////////////////
