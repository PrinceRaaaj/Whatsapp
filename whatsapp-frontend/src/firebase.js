// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAhDQYnw_eXeXhLo4AWgnqJAYYesLjttGQ",
    authDomain: "whatsapp-clone-prince.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-prince.firebaseio.com",
    projectId: "whatsapp-clone-prince",
    storageBucket: "whatsapp-clone-prince.appspot.com",
    messagingSenderId: "12988426126",
    appId: "1:12988426126:web:6e1191b158cb116893a6df",
    measurementId: "G-DS164DMDNW"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;  