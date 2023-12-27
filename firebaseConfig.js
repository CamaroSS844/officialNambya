// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALErYKKtRrPICxUq6QKexX8Y2MBFVt5w4",
  authDomain: "nambya-hymnbook.firebaseapp.com",
  projectId: "nambya-hymnbook",
  storageBucket: "nambya-hymnbook.appspot.com",
  messagingSenderId: "772558232411",
  appId: "1:772558232411:web:e7d6389c8da5d0d4c7987e",
  measurementId: "G-85CZH0F75L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 