// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCudNrSPQODZXuYxid47dOL0FZwPDpCYCU",
  authDomain: "creative-octo.firebaseapp.com",
  projectId: "creative-octo",
  storageBucket: "creative-octo.appspot.com",
  messagingSenderId: "274348353003",
  appId: "1:274348353003:web:5d89eb2d042f03831a25ae",
  measurementId: "G-7LGQ47Z03D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { doc, getDoc, db };
