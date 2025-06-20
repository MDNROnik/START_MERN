import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    // console.log("HELLO");

    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("user inside auth state change", currentUser);
      if (currentUser) {
        const userInfo = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        };
        console.log("in for current account");
        // setLoading(true);
        // axiosPublic.post("/jwt", userInfo).then((res) => {
        //   console.log(res);
        //   if (res.data.token) {
        //     localStorage.setItem("jwttoken", res.data.token);
        //     // setLoading(false);
        //     // for admin
        //     axiosPublic
        //       .get(`/user/${currentUser.uid}`, {
        //         headers: {
        //           jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        //         },
        //       })
        //       .then((res) => {
        //         currentUser.nowData = res.data;
        //         setUser(currentUser);
        //         // console.log(loading);
        //         // setLoading(false);
        //       })
        //       .catch((err) => {
        //         console.log(err.status);
        //       });

        //     setLoading(false);
        //   }
        // });
        // setLoading(false);
        try {
          const res = await axiosPublic.post("/jwt", userInfo);
          console.log(res);
          if (res.data.token) {
            localStorage.setItem("jwttoken", res.data.token);
            // setLoading(false);
            // for admin
            try {
              const userRes = await axiosPublic.get(
                `/user/${currentUser.uid}`,
                {
                  headers: {
                    jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
                  },
                }
              );
              currentUser.nowData = userRes.data;
              setUser(currentUser);
              // console.log(loading);
              // setLoading(false);
            } catch (err) {
              console.log(err.status);
            }
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      } else {
        localStorage.removeItem("jwttoken");
        // console.log("problem is here");
        // setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    createNewUser,
    signInUser,
    signOutUser,
    loading,
    setLoading,
    updateUserProfile,
    signInWithGoogle,
    carts,
    setCarts,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
