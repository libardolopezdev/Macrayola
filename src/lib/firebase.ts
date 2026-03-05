import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfYvBH6eNHf8Sb0HQZ-r9ZB2-Ud-sZKhM",
    authDomain: "macrayola-app.firebaseapp.com",
    projectId: "macrayola-app",
    storageBucket: "macrayola-app.firebasestorage.app",
    messagingSenderId: "913378433104",
    appId: "1:913378433104:web:73d4f3c9050ab93a1e5955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
