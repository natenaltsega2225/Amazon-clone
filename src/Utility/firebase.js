
import firebase  from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYHu4aNJ0ZMx-7fdMSiTpXkHflpBe9444",
  authDomain: "clone-75883.firebaseapp.com",
  projectId: "clone-75883",
  storageBucket: "clone-75883.appspot.com",
  messagingSenderId: "453736850730",
  appId: "1:453736850730:web:91012a1817c72469f7ea53"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const  auth = getAuth(app)
export const db = app.firestore()