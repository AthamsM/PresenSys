import { Router } from 'express';
import AlunoController from '../controllers/alunoController.js';

const router = Router();

router.post('/', AlunoController.create);
router.get('/', AlunoController.findAll);
router.get('/:id', AlunoController.findById);
router.put('/:id', AlunoController.update);
router.delete('/:id', AlunoController.delete);

export default router;