import React from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />

      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order</Link>
        <Link to="/manage">Manage-Order</Link>
      </nav>
    </div>
  );
};

export default Header;
