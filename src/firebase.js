import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "REACT_APP_API_KEY",
    authDomain: "REACT_APP_AUTH_DOMAIN",
    projectId: "REACT_APP_DATABASE_URL",
    storageBucket: "REACT_APP_PROJECT_ID",
    messagingSenderId: "REACT_APP_STORAGE_BUCKET",
    appId: "REACT_APP_APP_ID"
  };

  export default firebase.initializeApp(firebaseConfig);