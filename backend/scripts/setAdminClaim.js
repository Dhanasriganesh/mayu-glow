/**
 * One-time Node.js script to set the custom claim { role: "admin" } on a user UID.
 * 
 * Usage:
 *   node scripts/setAdminClaim.js <USER_UID>
 * 
 * Pre-requisites:
 *   Set standard Firebase service account environment variables or provide serviceAccountKey.json:
 *   GOOGLE_APPLICATION_CREDENTIALS="path/to/serviceAccountKey.json"
 */

import admin from 'firebase-admin';
import process from 'node:process';
import { createRequire } from 'node:module';
import path from 'node:path';
import 'dotenv/config';

const require = createRequire(import.meta.url);

const targetUid = process.argv[2];

if (!targetUid) {
  console.error("❌ Error: User UID is required.");
  console.log("Usage: node scripts/setAdminClaim.js <USER_UID>");
  process.exit(1);
}

if (!admin.apps.length) {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credPath) {
    console.error("❌ GOOGLE_APPLICATION_CREDENTIALS is not set in .env");
    process.exit(1);
  }
  const serviceAccount = require(path.resolve(process.cwd(), credPath));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

try {
  // Initialize admin SDK using default credentials or service account
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }

  console.log(`Setting custom claim { role: "admin" } for UID: ${targetUid}...`);

  await admin.auth().setCustomUserClaims(targetUid, { role: 'admin' });
  
  // Also update user document in Firestore for consistency
  const db = admin.firestore();
  await db.collection('users').doc(targetUid).set({
    role: 'admin'
  }, { merge: true });

  console.log(`✅ Success! Custom claim { role: "admin" } set for UID: ${targetUid}`);
  console.log(`Note: The user will need to log out and log back in (or refresh their ID token) for the claim to take effect.`);
  process.exit(0);
} catch (error) {
  console.error("❌ Failed to set admin claim:", error.message);
  process.exit(1);
}
