import { Router } from 'express';
import AttendanceController from '../controllers/attendanceController.js';

const router = Router();

router.post('/', AttendanceController.register);

export default router;