import React, { useContext, useState } from "react";

import { initializeApp } from "firebase/app";
import firebaseConfig from "../Login/firebase.config";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { userContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const app = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const userSignIn = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(userSignIn);
        console.log(res);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        const userSignOut = {
          isSignIn: "",
          name: "",
          email: "",
          error: "",
          success: true,
          photo: "",
        };
        setUser(userSignOut);
      })
      .catch((error) => {
        console.log(error);
      });
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
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name, user.email);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed inconst newUserInfo = { ...user };
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate(from);
          console.log("Sign in user info", res.user);
          // const user = res.user;
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name, email) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
      email: email,
    })
      .then(() => {
        console.log("User name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFacebookSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        // The signed-in user info.
        const user = res.user;
        console.log(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(res);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>this is firebase</h3>
      {user.isSignIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
      <br></br>
      <button onClick={handleFacebookSignIn}>Sign in using facebook</button>

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
