// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOU7fc89-0kVBH4hlPAxo4VClE7ontYxc",
  authDomain: "tifinbuddy.firebaseapp.com",
  projectId: "tifinbuddy",
  storageBucket: "tifinbuddy.appspot.com",
  messagingSenderId: "123670527905",
  appId: "1:123670527905:web:c939765a99a9cc51e0d5e0",
  measurementId: "G-C7CXHS6V44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,app,provider}
// const analytics = getAnalytics(app);