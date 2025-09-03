// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2KRoH2oe3w6PQ0KE6YZ_gL0YElr72HA0",
  authDomain: "smarttrip-fa326.firebaseapp.com",
  projectId: "smarttrip-fa326",
  storageBucket: "smarttrip-fa326.firebasestorage.app",
  messagingSenderId: "263131930678",
  appId: "1:263131930678:web:d6911341224b24c1f57897",
  measurementId: "G-B1XYSNR75X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
