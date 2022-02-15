import React, { useContext, useState } from "react";

import { userContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createEmailAndPassword,
  handleFacebookSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInEmailAndPassword,
} from "./loginManager";
import { getAuth } from "firebase/auth";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    // const auth = getAuth();
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const facebookSignIn = () => {
    // const auth = getAuth();
    handleFacebookSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleSignOut = () => {
    // const auth = getAuth();
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      navigate(from);
    }
  };

  const handleChange = (e) => {
    let isFormValid;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isFormValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      // const auth = getAuth();
      createEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      // const auth = getAuth();
      signInEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>this is firebase</h3>
      {user.isSignIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br></br>
      <button onClick={facebookSignIn}>Sign in using facebook</button>

      {user.isSignIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email is {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Create an Authentication</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">New User Sign up</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleChange}
            required
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleChange}
          name="email"
          required
          placeholder="Your email"
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleChange}
          required
          placeholder="password"
        />
        <br />
        <input type="submit" value={newUser ? "Submit" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "logged in"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
