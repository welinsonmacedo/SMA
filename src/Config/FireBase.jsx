// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACzJ2kJYo5VGvX9Vs3Q3ICJa-6fE_M6iw",
    authDomain: "mwgc-e1b67.firebaseapp.com",
    databaseURL: "https://mwgc-e1b67-default-rtdb.firebaseio.com",
    projectId: "mwgc-e1b67",
    storageBucket: "mwgc-e1b67.firebasestorage.app",
    messagingSenderId: "8143676142",
    appId: "1:8143676142:web:19be788c826d7a4d47c9ff",
    measurementId: "G-5NJXVLCQ4B"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
