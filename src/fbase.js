import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3TwJ6XKUtccygvOm2_RP01qL2CTJq6Aw",
  authDomain: "nwitter-8b5eb.firebaseapp.com",
  projectId: "nwitter-8b5eb",
  storageBucket: "nwitter-8b5eb.appspot.com",
  messagingSenderId: "894573354364",
  appId: "1:894573354364:web:a0d63c18f069e5bc9058f9",
  databaseURL: "gs://nwitter-8b5eb.appspot.com/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();