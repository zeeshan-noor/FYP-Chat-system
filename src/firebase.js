 import firebase from 'firebase';
 
 const firebaseConfig = {
    apiKey: "AIzaSyC4lD0LKItWICWMwGnzzm5mqroGt7ryb3I",
    authDomain: "chat-fyp-ff874.firebaseapp.com",
    projectId: "chat-fyp-ff874",
    storageBucket: "chat-fyp-ff874.appspot.com",
    messagingSenderId: "284501552867",
    appId: "1:284501552867:web:1acf724fecfb90bde15fd6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth,db,provider};