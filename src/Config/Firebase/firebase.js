import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAEFqE8N6tYqpsqZvbwsztSStDwTWbEaU0",
  authDomain: "reactnativefood-f1c19.firebaseapp.com",
  databaseURL: "https://reactnativefood-f1c19.firebaseio.com",
  projectId: "reactnativefood-f1c19",
  storageBucket: "reactnativefood-f1c19.appspot.com",
  messagingSenderId: "551858514072",
  appId: "1:551858514072:web:099f61e633988e6c2c48ed",
  measurementId: "G-GQW3MR3RR7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
