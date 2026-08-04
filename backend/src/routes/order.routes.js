import { Router } from 'express';
import { 
  createOrder, 
  getMyOrders, 
  getAllOrders, 
  updateOrderStatus 
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/mine', authMiddleware, getMyOrders);
router.get('/admin', authMiddleware, adminMiddleware, getAllOrders);
router.patch('/admin/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
