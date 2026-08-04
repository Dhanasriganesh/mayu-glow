import { db } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';

export class User {
  static collection = db.collection('users');

  static async getById(uid) {
    const docSnap = await this.collection.doc(uid).get();
    if (!docSnap.exists) return null;
    return { uid: docSnap.id, ...docSnap.data() };
  }

  static async create(uid, userData) {
    const payload = {
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      email: userData.email || '',
      role: 'user', // Default role is always "user"
      address: userData.address || '',
      postalCode: userData.postalCode || '',
      city: userData.city || '',
      state: userData.state || '',
      country: userData.country || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await this.collection.doc(uid).set(payload);
    return { uid, ...payload };
  }

  static async update(uid, updateData) {
    const docRef = this.collection.doc(uid);
    await docRef.set(updateData, { merge: true });
    return this.getById(uid);
  }

  static async count() {
    const snapshot = await this.collection.get();
    return snapshot.size;
  }
}

export default User;
