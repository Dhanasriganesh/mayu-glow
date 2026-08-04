import { db } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';

export class Category {
  static collection = db.collection('categories');

  static async getAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id) {
    const docSnap = await this.collection.doc(id).get();
    if (!docSnap.exists) return null;
    return { id: docSnap.id, ...docSnap.data() };
  }

  static async create(data) {
    const payload = {
      name: data.name,
      description: data.description || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await this.collection.add(payload);
    return { id: docRef.id, ...payload };
  }

  static async update(id, data) {
    const docRef = this.collection.doc(id);
    const payload = {
      name: data.name,
      description: data.description || ''
    };
    await docRef.update(payload);
    return this.getById(id);
  }

  static async delete(id) {
    await this.collection.doc(id).delete();
    return true;
  }
}

export default Category;
