import { Router } from 'express';
import classRoutes from './classRoutes.js';
import studentRoutes from './studentRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import reportRoutes from './reportRoutes.js';
import userRoutes from './userRoutes.js';
import { authVerification } from '../middlewares/auth.js'

const router = Router();

router.use('/class', authVerification, classRoutes);
router.use('/students', authVerification, studentRoutes);
router.use('/attendances', authVerification, attendanceRoutes);
router.use('/reports', authVerification, reportRoutes);
router.use('/users', userRoutes);

export default router;