import { Router } from 'express';
import StudentController from '../controllers/studentController.js';

const router = Router();

router.post('/', StudentController.create);
router.get('/', StudentController.findAll);
router.get('/:id', StudentController.findByEnrollment);
router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.delete);

export default router;