import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const firebaseConfig={
 apiKey:"AIzaSyB3bTd4yA869hoH_nhbaEigXvxDBJYZoa0",
 authDomain:"accountstore-429f8.firebaseapp.com",
 projectId:"accountstore-429f8",
 storageBucket:"accountstore-429f8.firebasestorage.app",
 messagingSenderId:"63564338179",
 appId:"1:63564338179:web:c964eb07be2cde7e39aa36"
};

const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const provider=new GoogleAuthProvider();
export {signInWithPopup,onAuthStateChanged,collection,getDocs,doc,getDoc,setDoc,deleteDoc,serverTimestamp};
