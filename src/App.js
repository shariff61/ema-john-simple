import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Error from "./components/Error/Error";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import ManageOrder from "./components/ManageOrder/ManageOrder";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetail from "./components/ProductDetail/ProductDetail";
// import ProductId from "./components/ProductId/ProductId";
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
// import SellerDetail from "./components/SellerDetail/SellerDetail";
import Shop from "./components/Shop/Shop";

export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>email: {loggedInUser.email}</h2>

      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route path="/shop" element={<Shop></Shop>}></Route>
          <Route path="/review" element={<Review></Review>}></Route>
          <Route
            path="/manage"
            element={
              <PrivateRoute>
                <ManageOrder></ManageOrder>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/shipment"
            element={
              <PrivateRoute>
                <Shipment></Shipment>
              </PrivateRoute>
            }
          ></Route>

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
    </userContext.Provider>
  );
}

export default App;
