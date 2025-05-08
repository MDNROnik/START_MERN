import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthProviders = createContext(null);

const AuthProvidersComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userInfo = {
    user,
    loading,
    createUser,
    logIn,
  };

  return (
    <AuthProviders.Provider value={userInfo}>{children}</AuthProviders.Provider>
  );
};

export default AuthProvidersComponent;
