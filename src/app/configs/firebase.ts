import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNBJF5Ceb4fF8NbZee1HqDeWHesd3rO-s",
  authDomain: "giznew-4a7d6.firebaseapp.com",
  projectId: "giznew-4a7d6",
  storageBucket: "giznew-4a7d6.appspot.com",
  messagingSenderId: "100964935643",
  appId: "1:100964935643:web:2282ea007baf71d4c6e9fe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
