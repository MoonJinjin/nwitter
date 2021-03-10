import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3TwJ6XKUtccygvOm2_RP01qL2CTJq6Aw",
    authDomain: "nwitter-8b5eb.firebaseapp.com",
    projectId: "nwitter-8b5eb_URL",
    storageBucket: "nwitter-8b5eb.appspot.com",
    messagingSenderId: "894573354364",
    appId: "1:894573354364:web:a0d63c18f069e5bc9058f9"
  };

  firebase.initializeApp(firebaseConfig);

  export const authService = firebase.auth();