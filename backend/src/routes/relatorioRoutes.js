import { Router } from 'express';
import RelatorioController from '../controllers/relatorioController.js';

const router = Router();

router.get('/faltas-alunos', RelatorioController.listarFaltasPorAluno);
router.get('/turma/:turmaId', RelatorioController.listarFaltasPorTurma);
router.get('/serie', RelatorioController.listarFaltasPorSerie);
router.get('/aluno/:alunoId/percentual', RelatorioController.calcularPercentualPresenca);

export default router;