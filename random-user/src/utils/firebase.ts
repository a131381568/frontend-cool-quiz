import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const APP_API_KEY = import.meta.env.VITE_APP_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_APP_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_APP_PROJECT_ID;
const STORAGEBUCKET = import.meta.env.VITE_APP_STORAGEBUCKET;
const MESSAGINGSENDERID = import.meta.env.VITE_APP_MESSAGINGSENDERID;
const APPID = import.meta.env.VITE_APP_APPID;

const firebaseConfig = {
  apiKey: String(APP_API_KEY),
  authDomain: String(AUTH_DOMAIN),
  projectId: String(PROJECT_ID),
  storageBucket: String(STORAGEBUCKET),
  messagingSenderId: String(MESSAGINGSENDERID),
  appId: String(APPID),
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
