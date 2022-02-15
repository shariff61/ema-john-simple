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

export const initializeLoginFramework = () => {
  const app = initializeApp(firebaseConfig);
};
//google sign in

export const handleGoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const userSignIn = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return userSignIn;
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
//facebook sign in

export const handleFacebookSignIn = () => {
  const facebookProvider = new FacebookAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, facebookProvider)
    .then((res) => {
      // The signed-in user info.

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(res);
      const accessToken = credential.accessToken;
      const user = res.user;
      user.success = true;
      return user;

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

//handle sign out

export const handleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then((res) => {
      const userSignOut = {
        isSignIn: "",
        name: "",
        email: "",
        error: "",
        success: false,
        photo: "",
      };
      return userSignOut;
    })
    .catch((error) => {
      console.log(error);
    });
};

//create email user

export const createEmailAndPassword = (name, email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// //sign in user

export const signInEmailAndPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed inconst newUserInfo = { ...user };
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;

      return newUserInfo;

      // const user = res.user;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// //   update user name

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
