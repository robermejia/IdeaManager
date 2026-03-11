import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWt9Wbyz-ZX2r4z6ml7Xh27hsYlaiQFjI",
  authDomain: "ideamanager-e3959.firebaseapp.com",
  projectId: "ideamanager-e3959",
  storageBucket: "ideamanager-e3959.firebasestorage.app",
  messagingSenderId: "27014969071",
  appId: "1:27014969071:web:080ff222957a34dfbd8d1a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
