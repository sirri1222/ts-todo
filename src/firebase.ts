import { initializeApp } from "firebase/app";
// firestore Import
import { getFirestore } from "firebase/firestore";
// firebase Auth
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// 초기화
const app = initializeApp(firebaseConfig);
// firestor 내보기
export const fireDB = getFirestore(app);
// 인증하기
export const auth = getAuth(app);
