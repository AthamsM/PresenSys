import { Router } from 'express';
import classRoutes from './classRoutes.js';
import studentRoutes from './studentRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import reportRoutes from './reportRoutes.js';
import userRoutes from './userRoutes.js';
import { authVerification } from '../middlewares/auth.js'
import { tenantVerification } from '../middlewares/tenant.js';

const router = Router();

router.use('/class', authVerification, tenantVerification, classRoutes);
router.use('/students', authVerification, tenantVerification, studentRoutes);
router.use('/attendances', authVerification, tenantVerification, attendanceRoutes);
router.use('/reports', authVerification, tenantVerification, reportRoutes);
router.use('/users', userRoutes);

export default router;