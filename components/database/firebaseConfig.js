// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Use the provided Firebase configuration (app-1)
const firebaseConfig = {
  apiKey: "AIzaSyB2O0sHto5B_n3hfch1kqR_tZYpYHwwWdk",
  authDomain: "app-1-4c4c7.firebaseapp.com",
  projectId: "app-1-4c4c7",
  storageBucket: "app-1-4c4c7.firebasestorage.app",
  messagingSenderId: "803453456484",
  appId: "1:803453456484:web:0043aa635a754811148f71",
  measurementId: "G-S1HJDQ2SJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics may not be supported in some RN environments; ignore
}

// export auth instance
const auth = getAuth(app);

export { app, auth, analytics };
