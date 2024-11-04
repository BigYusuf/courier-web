// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKhcMUFyvALjMlsXqIwKp3xPKHILBwTdg",
    authDomain: "twtevacuation.firebaseapp.com",
    projectId: "twtevacuation",
    storageBucket: "twtevacuation.appspot.com",
    messagingSenderId: "598509889617",
    appId: "1:598509889617:web:8300c3ac890a0495b87070"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);