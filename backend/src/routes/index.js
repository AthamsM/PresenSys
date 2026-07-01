import { Router } from 'express';
import turmaRoutes from './turmaRoutes.js';
import alunoRoutes from './alunoRoutes.js';
import frequenciaRoutes from './frequenciaRoutes.js';
import relatorioRoutes from './relatorioRoutes.js';
import usuarioRoutes from './usuarioRoutes.js';

const router = Router();

router.use('/turmas', turmaRoutes);
router.use('/alunos', alunoRoutes);
router.use('/frequencias', frequenciaRoutes);
router.use('/relatorios', relatorioRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;