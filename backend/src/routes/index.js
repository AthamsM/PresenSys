import { Router } from 'express';
import turmaRoutes from './turmaRoutes.js';
import alunoRoutes from './alunoRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import reportRoutes from './reportRoutes.js';
import userRoutes from './userRoutes.js';
import { authVerification } from '../middlewares/auth.js'

const router = Router();

router.use('/class', turmaRoutes);
router.use('/studant', alunoRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);

export default router;