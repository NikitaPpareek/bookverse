import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwlTwr7-AirDxtCSUHNbsMt_7lhZEM3oQ",
  authDomain: "bookverse-d98b1.firebaseapp.com",
  projectId: "bookverse-d98b1",
  storageBucket: "bookverse-d98b1.firebasestorage.app",
  messagingSenderId: "868506313050",
  appId: "1:868506313050:web:4640a32799db930b841363",
  measurementId: "G-FYWL4RVFSL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;