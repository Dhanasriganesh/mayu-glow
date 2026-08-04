import { db, bucket } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';

export class Product {
  static collection = db.collection('products');

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
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10) || 0,
      categoryId: data.categoryId,
      imageUrls: data.imageUrls || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await this.collection.add(payload);
    return { id: docRef.id, ...payload };
  }

  static async update(id, data) {
    const docRef = this.collection.doc(id);
    const payload = {
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    if (data.price !== undefined) payload.price = parseFloat(data.price);
    if (data.stock !== undefined) payload.stock = parseInt(data.stock, 10);

    await docRef.update(payload);
    return this.getById(id);
  }

  static async delete(id) {
    // Delete product images from Firebase Storage
    try {
      await bucket.deleteFiles({ prefix: `products/${id}/` });
    } catch (err) {
      console.warn(`Storage deletion warning for product ${id}:`, err.message);
    }
    await this.collection.doc(id).delete();
    return true;
  }

  static async uploadImageBuffer(productId, fileBuffer, mimeType, originalName) {
    const fileName = `products/${productId}/${Date.now()}_${originalName.replace(/\s+/g, '_')}`;
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
      metadata: { contentType: mimeType },
      public: true
    });

    // Make public or get public URL
    try {
      await file.makePublic();
    } catch (err) {
      console.warn("Make public notice:", err.message);
    }

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
  }

  static async count() {
    const snapshot = await this.collection.get();
    return snapshot.size;
  }
}

export default Product;
