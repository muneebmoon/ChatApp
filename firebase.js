// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpVogZ3Zc5CMHmECgAzisK1f7-FS9yiDU",
  authDomain: "chatapp-486cf.firebaseapp.com",
  projectId: "chatapp-486cf",
  storageBucket: "chatapp-486cf.firebasestorage.app",
  messagingSenderId: "535935828806",
  appId: "1:535935828806:android:56c1501712736a95539b47"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
