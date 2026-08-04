import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || 'mayu-glow',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'mayu-glow.appspot.com',
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS || ''
};

export default config;
