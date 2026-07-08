import { Router } from 'express';
import ClassController from '../controllers/classController.js';

const router = Router();

router.post('/', ClassController.create);
router.get('/', ClassController.findAll);
router.get('/:id', ClassController.findById);
router.put('/:id', ClassController.update);
router.delete('/:id', ClassController.delete);

export default router;