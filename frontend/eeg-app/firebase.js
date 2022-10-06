// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIOwGpVUeLFzK-jgokGSknLkghMLBIyI8",
  authDomain: "eeg-app-31823.firebaseapp.com",
  projectId: "eeg-app-31823",
  storageBucket: "eeg-app-31823.appspot.com",
  messagingSenderId: "92837153975",
  appId: "1:92837153975:web:9b0ec9b3917aad18e39132"
};

// Initialize Firebase
let app;
if (firebase.getApps().length===0){
    app = firebase.initializeApp(firebaseConfig);

}else{
    app= firebase.getApp()
}