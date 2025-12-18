// Steam app Firebase config (app-1)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2O0sHto5B_n3hfch1kqR_tZYpYHwwWdk",
  authDomain: "app-1-4c4c7.firebaseapp.com",
  projectId: "app-1-4c4c7",
  storageBucket: "app-1-4c4c7.firebasestorage.app",
  messagingSenderId: "803453456484",
  appId: "1:803453456484:web:0043aa635a754811148f71",
  measurementId: "G-S1HJDQ2SJ3",
};

const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // ignore in RN environment
}

const auth = getAuth(app);

export { app, auth, analytics };
