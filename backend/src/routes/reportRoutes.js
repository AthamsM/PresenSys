import { Router } from 'express';
import ReportController from '../controllers/reportController.js';

const router = Router();

router.get('/foul-all', ReportController.getFoulAll);
router.get('/foul-class', ReportController.getFoulClass);
router.get('/foul-grade', ReportController.getFoulGrade);
router.get('/foul-grade-class', ReportController.getFoulGradeInClass);
router.get('/foul-student', ReportController.getFoulStudent);

export default router;