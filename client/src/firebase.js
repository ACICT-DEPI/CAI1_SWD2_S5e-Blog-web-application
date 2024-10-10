// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-web-app-f45ab.firebaseapp.com",
    projectId: "blog-web-app-f45ab",
    storageBucket: "blog-web-app-f45ab.appspot.com",
    messagingSenderId: "1008031951637",
    appId: "1:1008031951637:web:84af93bcfe1ddd2df8d71c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);