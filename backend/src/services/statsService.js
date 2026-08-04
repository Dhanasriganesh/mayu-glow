import { db } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';
import Product from '../models/Product.js';

export class StatsService {
  static async getSalesStats(rangeDays = 30) {
    const windowDays = parseInt(rangeDays, 10) || 30;
    
    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - windowDays);
    const cutoffTimestamp = admin.firestore.Timestamp.fromDate(cutoffDate);

    // Query orders created within window
    const ordersSnap = await db.collection('orders')
      .where('createdAt', '>=', cutoffTimestamp)
      .get();

    // Fetch all products map for title & image references
    const products = await Product.getAll();
    const productMap = {};
    const productSales = {};

    products.forEach(p => {
      productMap[p.id] = p;
      productSales[p.id] = 0; // Initialize 0 sales count
    });

    // Sum qty per productId across windowed orders
    ordersSnap.docs.forEach(docSnap => {
      const order = docSnap.data();
      if (Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (item.productId) {
            productSales[item.productId] = (productSales[item.productId] || 0) + (parseInt(item.qty, 10) || 1);
          }
        });
      }
    });

    // Transform into ranked list
    const salesList = Object.keys(productSales).map(pid => {
      const prod = productMap[pid] || { name: `Product (${pid.slice(0, 6)})`, price: 0 };
      const qtySold = productSales[pid];
      return {
        productId: pid,
        name: prod.name,
        imageUrl: prod.imageUrls?.[0] || null,
        price: prod.price || 0,
        qtySold,
        totalRevenue: qtySold * (prod.price || 0)
      };
    });

    // Sort descending for best sellers (Top 5)
    const bestSellers = [...salesList].sort((a, b) => b.qtySold - a.qtySold).slice(0, 5);

    // Sort ascending for worst sellers (Bottom 5)
    const worstSellers = [...salesList].sort((a, b) => a.qtySold - b.qtySold).slice(0, 5);

    return {
      windowDays,
      totalOrdersInWindow: ordersSnap.size,
      bestSellers,
      worstSellers
    };
  }

  static async getOverviewStats() {
    const [userCount, productCount, orderCount] = await Promise.all([
      db.collection('users').get().then(s => s.size),
      db.collection('products').get().then(s => s.size),
      db.collection('orders').get().then(s => s.size)
    ]);

    const ordersSnap = await db.collection('orders').get();
    let totalRevenue = 0;
    ordersSnap.docs.forEach(doc => {
      totalRevenue += (doc.data().total || 0);
    });

    return {
      userCount,
      productCount,
      orderCount,
      totalRevenue
    };
  }
}

export default StatsService;
