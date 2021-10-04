
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  
  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBm2-88sPZxICqNmLpCrc8ZleawalQC2fk",
    authDomain: "insta-1-f5328.firebaseapp.com",
    projectId: "insta-1-f5328",
    storageBucket: "insta-1-f5328.appspot.com",
    messagingSenderId: "491687392366",
    appId: "1:491687392366:web:af296c8204b2a5d0e2a27f",
    measurementId: "G-EET6B2WCBG"

  });

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export  {db,auth,storage};