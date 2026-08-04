import { Router } from 'express';
import { getOverviewStats, getSalesStats } from '../controllers/statsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/overview', authMiddleware, adminMiddleware, getOverviewStats);
router.get('/sales', authMiddleware, adminMiddleware, getSalesStats);

export default router;
