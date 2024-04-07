import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	// apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	// authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	// projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	// storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	// appId: import.meta.env.VITE_FIREBASE_APP_ID,
	apiKey: "AIzaSyAR5mo0ssTgfqEIFpTm80ePC8PzDSqo078",
	authDomain: "job-interview-chatbot-f23d8.firebaseapp.com",
	projectId: "job-interview-chatbot-f23d8",
	storageBucket: "job-interview-chatbot-f23d8.appspot.com",
	messagingSenderId: "172093336997",
	appId: "1:172093336997:web:1e0ab121c6b6af80a40c4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
