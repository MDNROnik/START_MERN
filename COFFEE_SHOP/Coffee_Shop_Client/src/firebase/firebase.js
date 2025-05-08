import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy9JyPR_Re4p4HYGuiXtyxZhbmr0qfNiA",
  authDomain: "coffee-shop-94a09.firebaseapp.com",
  projectId: "coffee-shop-94a09",
  storageBucket: "coffee-shop-94a09.firebasestorage.app",
  messagingSenderId: "55328324628",
  appId: "1:55328324628:web:4e9225f3eeeb682ecbbb01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);