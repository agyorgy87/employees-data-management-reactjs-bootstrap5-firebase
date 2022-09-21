import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAFEk9JybsZql_8KcdmxapqroHvAJL5Llg",
  authDomain: "edmsbs5.firebaseapp.com",
  projectId: "edmsbs5",
  storageBucket: "edmsbs5.appspot.com",
  messagingSenderId: "667382902613",
  appId: "1:667382902613:web:2f86d86c038d9ed49309dc",
  measurementId: "G-3BW75LG2BS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

