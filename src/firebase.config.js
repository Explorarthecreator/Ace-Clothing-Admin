// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgM3TWVqw0_3IJt5dvE_QgtWOlokjFUOk",
  authDomain: "ace-clothing-8023d.firebaseapp.com",
  projectId: "ace-clothing-8023d",
  storageBucket: "ace-clothing-8023d.appspot.com",
  messagingSenderId: "268637588400",
  appId: "1:268637588400:web:d960c567bef77d148f2475",
  measurementId: "G-MP9RH3JFSJ"
};

// Initialize Firebase
// initializeApp(firebaseConfig)
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore()