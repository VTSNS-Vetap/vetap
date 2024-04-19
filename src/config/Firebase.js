import { initializeApp } from "firebase/app";
import { collection,getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZiDAFY8M4kDsB9vUAtsJkT8fFWTvPKew",
  authDomain: "vetap-4fd19.firebaseapp.com",
  projectId: "vetap-4fd19",
  storageBucket: "vetap-4fd19.appspot.com",
  messagingSenderId: "774817529486",
  appId: "1:774817529486:web:a94d98186665a86e8393df",
  measurementId: "G-J02H7NSN6P"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const zaposleniCollectionRef = collection(db, "Zaposleni");
export const contactCollectionRef = collection(db, "Kontakti");