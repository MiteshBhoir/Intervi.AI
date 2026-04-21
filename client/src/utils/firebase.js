
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviai-32f52.firebaseapp.com",
  projectId: "interviai-32f52",
  storageBucket: "interviai-32f52.firebasestorage.app",
  messagingSenderId: "687109081216",
  appId: "1:687109081216:web:964ac8b0eb3eadc3493e65"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
