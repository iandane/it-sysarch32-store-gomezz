import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDbtO_-fFo_GWMZBPBMiRd-yCDYRaYC1zc",
    authDomain: "it-sysarch32-store-rabago.firebaseapp.com",
    projectId: "it-sysarch32-store-rabago",
    storageBucket: "it-sysarch32-store-rabago.appspot.com",
    messagingSenderId: "974025855753",
    appId: "1:974025855753:web:d9de30590f849b19d939d8",
    measurementId: "G-02LVT4TYBC"
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)

export const storage = getStorage(app);