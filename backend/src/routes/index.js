import { Router } from 'express';
import turmaRoutes from './turmaRoutes.js';
import studentRoutes from './studentRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import reportRoutes from './reportRoutes.js';
import userRoutes from './userRoutes.js';
import { authVerification } from '../middlewares/auth.js'

const router = Router();

router.use('/class', turmaRoutes);
router.use('/students', studentRoutes);
router.use('/attendances', attendanceRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);

export default router;