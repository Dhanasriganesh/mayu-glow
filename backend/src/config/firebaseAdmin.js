import admin from 'firebase-admin';
import { createRequire } from 'node:module';
import config from './env.js';

const require = createRequire(import.meta.url);

if (!admin.apps.length) {
  if (!config.googleApplicationCredentials) {
    throw new Error(
      'GOOGLE_APPLICATION_CREDENTIALS is not set in .env — cannot initialize Firebase Admin SDK.'
    );
  }

  const serviceAccount = require(
    path.resolve(process.cwd(), config.googleApplicationCredentials)
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.storageBucket
  });

  console.log('Firebase Admin SDK initialized successfully');
}

export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();

export default admin;