import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMUJhiyAFQwcaSBnfAwF8GqcXu6IvawKg",
    authDomain: "chatapplication-98e8b.firebaseapp.com",
    projectId: "chatapplication-98e8b",
    storageBucket: "chatapplication-98e8b.appspot.com",
    messagingSenderId: "128926186486",
    appId: "1:128926186486:web:423f90c6d93d5bbc98e5d7",
    measurementId: "G-4EX0MQWDGL"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore()
export  {auth, provider,db};