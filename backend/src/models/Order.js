import { db } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';

export class Order {
  static collection = db.collection('orders');

  static async getAll() {
    const snapshot = await this.collection.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getByUserId(userId) {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id) {
    const docSnap = await this.collection.doc(id).get();
    if (!docSnap.exists) return null;
    return { id: docSnap.id, ...docSnap.data() };
  }

  static async create(orderData) {
    const payload = {
      userId: orderData.userId,
      items: orderData.items || [],
      total: parseFloat(orderData.total),
      status: 'Pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await this.collection.add(payload);
    return { id: docRef.id, ...payload };
  }

  static async updateStatus(id, newStatus) {
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid order status: ${newStatus}`);
    }

    const docRef = this.collection.doc(id);
    await docRef.update({ status: newStatus });
    return this.getById(id);
  }

  static async count() {
    const snapshot = await this.collection.get();
    return snapshot.size;
  }
}

export default Order;
