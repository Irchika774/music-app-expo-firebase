import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  
  apiKey: "AIzaSyDHPZS7H3pbSMGih8BEGkWuUA4O0TGS_nI",
  authDomain: "songlibrary-38a83.firebaseapp.com",
  projectId: "songlibrary-38a83",
  storageBucket: "songlibrary-38a83.firebasestorage.app",
  messagingSenderId: "709521809310",
  appId: "1:709521809310:web:44b3a847776ab89b85408f",
  measurementId: "G-PTQS3W9VDJ"

};


export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
