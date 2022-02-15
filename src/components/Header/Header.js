import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <div className="header">
      <img src={logo} alt="" />

      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order</Link>
        <Link to="/manage">Manage-Order</Link>
        <button onClick={() => setLoggedInUser({})}>Log out</button>
      </nav>
    </div>
  );
};

export default Header;
