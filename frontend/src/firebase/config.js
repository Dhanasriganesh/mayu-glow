import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForMayuGlowEcommerceApp12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mayu-glow.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mayu-glow",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mayu-glow.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Client SDK exports ONLY getAuth() — no Firestore/Storage client instances
export const auth = getAuth(app);

export default app;
