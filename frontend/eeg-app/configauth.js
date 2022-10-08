import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc2XLZOTvrjzv4Iw_Kge5rXhB9Ahgc-90",
  authDomain: "test-3fc13.firebaseapp.com",
  projectId: "test-3fc13",
  storageBucket: "test-3fc13.appspot.com",
  messagingSenderId: "981887438504",
  appId: "1:981887438504:web:c65f0b171a1724e7ba3c9d",
  measurementId: "G-QN2386FQG1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
export { firebase };
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
