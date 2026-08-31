import { Router } from 'express';
import AttendanceController from '../controllers/attendanceController.js';

const router = Router();

router.post('/', AttendanceController.register);

router.get('/class/:classId/:date', AttendanceController.getAttendanceByClassAndDate);

router.get('/check/:classId/:date', AttendanceController.checkAttendance);

export default router;