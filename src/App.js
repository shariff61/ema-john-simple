import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./App.css";
import Error from "./components/Error/Error";
import Header from "./components/Header/Header";
import ManageOrder from "./components/ManageOrder/ManageOrder";
import ProductDetail from "./components/ProductDetail/ProductDetail";
// import ProductId from "./components/ProductId/ProductId";
import Review from "./components/Review/Review";
// import SellerDetail from "./components/SellerDetail/SellerDetail";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/shop" element={<Shop></Shop>}></Route>
          <Route path="/review" element={<Review></Review>}></Route>
          <Route path="/manage" element={<ManageOrder></ManageOrder>}></Route>
          <Route
            path="/product/:productKey"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          {/* <Route
            path="/product/:productStar"
            element={<SellerDetail></SellerDetail>}
          ></Route> */}
          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
