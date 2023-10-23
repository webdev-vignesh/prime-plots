// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "prime-plots.firebaseapp.com",
  projectId: "prime-plots",
  storageBucket: "prime-plots.appspot.com",
  messagingSenderId: "146093228993",
  appId: "1:146093228993:web:f801d57d79e6fb2abde540"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);