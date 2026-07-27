// firebaseconfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔑 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHPZS7H3pbSMGih8BEGkWuUA4O0TGS_nI",
  authDomain: "songlibrary-38a83.firebaseapp.com",
  projectId: "songlibrary-38a83",
  storageBucket: "songlibrary-38a83.appspot.com",
  messagingSenderId: "709521809310",
  appId: "1:709521809310:web:44b3a847776ab89b85408f",
  measurementId: "G-PTQS3W9VDJ",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth (persistence is automatic in v12)
export const auth = getAuth(app);

// ✅ Firestore
export const db = getFirestore(app);

// ✅ Storage
export const storage = getStorage(app);

export default app;
