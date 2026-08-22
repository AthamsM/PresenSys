import { Router } from 'express';
import ChartController from '../controllers/chartController.js';

const router = Router();

router.get('/fouls-per-month/:year', ChartController.foulsPerMonth);
router.get('/students-most-fouls/:year', ChartController.studentsMostFouls);
router.get('/classes-fouls/:year', ChartController.classesFouls);

export default router;