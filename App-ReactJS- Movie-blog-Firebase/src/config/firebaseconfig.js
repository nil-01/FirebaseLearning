// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi2pur4Ed8UpBPzpH-mIBVgZddWBAyK3s",
  authDomain: "blog-web-app-e3afa.firebaseapp.com",
  projectId: "blog-web-app-e3afa",
  storageBucket: "blog-web-app-e3afa.appspot.com",
  messagingSenderId: "576629004927",
  appId: "1:576629004927:web:4584228b64f700f185bd4a",
  measurementId: "G-S5MFR971D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export {auth,firestore,storage};
export default app;