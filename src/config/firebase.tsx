// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASHWiI1RPKv6Ukle96SyuXZhYD6BAetEY",
  authDomain: "motivational-quotes-generator.firebaseapp.com",
  projectId: "motivational-quotes-generator",
  storageBucket: "motivational-quotes-generator.appspot.com",
  messagingSenderId: "432837845186",
  appId: "1:432837845186:web:f4cd46b036758d996b1b5b",
  measurementId: "G-DPVSJFM27L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
