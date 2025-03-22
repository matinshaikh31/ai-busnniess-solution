import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFAm_hoZGIiRs0cHVQOhfH6CJjaKvfj9E",
  authDomain: "bookfiy.firebaseapp.com",
  databaseURL: "https://bookfiy-default-rtdb.firebaseio.com",
  projectId: "bookfiy",
  storageBucket: "bookfiy.appspot.com",
  messagingSenderId: "1083163659912",
  appId: "1:1083163659912:web:19934676439d2e688ad93d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance

export { db };
