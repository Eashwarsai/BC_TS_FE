import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_FIREBASE_API}`,
  authDomain: "event-management-app-25405.firebaseapp.com",
  projectId: "event-management-app-25405",
  storageBucket: "event-management-app-25405.appspot.com",
  messagingSenderId: "242323498800",
  appId: "1:242323498800:web:b64b2e1c45cd2dad50caf5",
  measurementId: "G-BWE9ZPX6PW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}