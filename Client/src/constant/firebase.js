// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBl5AwHDBpFToiHUHIEVXC8Dkc5SyanxVI",
    authDomain: "votermanagement-742ee.firebaseapp.com",
    projectId: "votermanagement-742ee",
    storageBucket: "votermanagement-742ee.appspot.com",
    messagingSenderId: "402536432162",
    appId: "1:402536432162:web:a0cae2c8aba00bf1db407b",
    measurementId: "G-3NBZCH5NPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);