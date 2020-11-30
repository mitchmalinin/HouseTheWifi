import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_3ZK0Bh4RFk7YubWn2ze1Q0osTVL7AyM",
  authDomain: "housethewifi.firebaseapp.com",
  databaseURL: "https://housethewifi.firebaseio.com",
  projectId: "housethewifi",
  storageBucket: "housethewifi.appspot.com",
  messagingSenderId: "424861927245",
  appId: "1:424861927245:web:3d17251e789c50ed2ad904",
  measurementId: "G-1L3NDMESRT",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
