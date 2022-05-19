
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEzxvMYtdkkigQDsWEM40zGvH_lQyYSiI",
  authDomain: "simple-blog-b0a96.firebaseapp.com",
  projectId: "simple-blog-b0a96",
  storageBucket: "simple-blog-b0a96.appspot.com",
  messagingSenderId: "141887961800",
  appId: "1:141887961800:web:afef8c0e962443ba82c3fd",
  measurementId: "G-8LBNWQY9GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();


