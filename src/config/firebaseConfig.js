import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDG02KVh2QmACpkSQTW3051fHjzsCE-mR8",
    authDomain: "react-js-final-55acf.firebaseapp.com",
    projectId: "react-js-final-55acf",
    storageBucket: "react-js-final-55acf.firebasestorage.app",
    messagingSenderId: "143735469829",
    appId: "1:143735469829:web:4555f225e4002ecc78696c",
    measurementId: "G-MWZ046CPLB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)