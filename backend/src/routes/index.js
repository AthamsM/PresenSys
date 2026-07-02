import { Router } from 'express';
import turmaRoutes from './turmaRoutes.js';
import alunoRoutes from './alunoRoutes.js';
import frequenciaRoutes from './frequenciaRoutes.js';
import relatorioRoutes from './relatorioRoutes.js';
import userRoutes from './userRoutes.js';
import { authVerification } from '../middlewares/auth.js'

const router = Router();

router.use('/turmas', authVerification, turmaRoutes);
router.use('/alunos', authVerification, alunoRoutes);
router.use('/frequencias', authVerification, frequenciaRoutes);
router.use('/relatorios', authVerification, relatorioRoutes);
router.use('/users', userRoutes);

export default router;