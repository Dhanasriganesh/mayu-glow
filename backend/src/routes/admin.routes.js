import { Router } from 'express';
import { getOverviewStats, getSalesStats } from '../controllers/statsController.js';
import { getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats/overview', getOverviewStats);
router.get('/stats/sales', getSalesStats);
router.get('/orders', getAllOrders);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
