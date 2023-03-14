// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP44h5UwAnenMA_st-gJyRVGZs4qTyz00",
  authDomain: "company-dashboard-7b55c.firebaseapp.com",
  databaseURL: "https://company-dashboard-7b55c-default-rtdb.firebaseio.com",
  projectId: "company-dashboard-7b55c",
  storageBucket: "company-dashboard-7b55c.appspot.com",
  messagingSenderId: "901143860328",
  appId: "1:901143860328:web:5b6f07b306b632100957dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



export const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);  
}

export const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

