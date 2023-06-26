// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4Q14acT479ov2jUSAe4ppfUH5IF3y9gU",
  authDomain: "social-media-firebase-43d7b.firebaseapp.com",
  projectId: "social-media-firebase-43d7b",
  storageBucket: "social-media-firebase-43d7b.appspot.com",
  messagingSenderId: "564276416350",
  appId: "1:564276416350:web:65878992e51dd8251189cf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app)
const db = getFirestore(app)


export {auth,db, onAuthStateChanged}

