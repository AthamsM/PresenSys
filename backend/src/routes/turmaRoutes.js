import { Router } from 'express';
import TurmaController from '../controllers/turmaController.js';

const router = Router();

router.post('/', TurmaController.create);
router.get('/', TurmaController.findAll);
router.get('/:id', TurmaController.findById);
router.put('/:id', TurmaController.update);
router.delete('/:id', TurmaController.delete);

export default router;