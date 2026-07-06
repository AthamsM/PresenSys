import { Router } from 'express';
import ReportController from '../controllers/reportController.js';

const router = Router();

router.get('/foul-all', ReportController.getFoulAll);
router.get('/foul-class', ReportController.getFoulClass);
router.get('/foul-serie', ReportController.getFoulSerie);
router.get('/foul-serie-class', ReportController.getFoulSerieInClass);
router.get('/foul-studant', ReportController.getFoulStudent);

export default router;