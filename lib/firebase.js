// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHlvcS1AuefijoZXypldT_MhZLTKPzUD0",
  authDomain: "wayangtamagotchi.firebaseapp.com",
  databaseURL: "https://wayangtamagotchi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wayangtamagotchi",
  storageBucket: "wayangtamagotchi.appspot.com",
  messagingSenderId: "811825027180",
  appId: "1:811825027180:web:daaa002a0f0df1d2c6a049",
  measurementId: "G-LP6GJ25X1C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export { ref, set, get, child };
