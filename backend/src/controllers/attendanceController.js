import AttendanceService from '../services/attendanceService.js';

class AttendanceController {
  async register(req, res, next) {
    try {
      const { classId, date, attendance } = req.body;
      const result = await AttendanceService.register(classId, date, attendance);
      return res.status(200).json({ message: 'Chamada registrada com sucesso!', quantidade: result.length });
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceByClassAndDate(req, res, next) {
    try {
      const { classId, date } = req.params;
      const attendance = await AttendanceService.getAttendanceByClassAndDate(classId, date);
      return res.status(200).json({ attendance });
    } catch (error) {
      next(error);
    }
  }

  async checkAttendance(req, res, next) {
    try {
      const { classId, date } = req.params;
      const alreadyTaken = await AttendanceService.checkAttendance(classId, date);
      return res.status(200).json({alreadyTaken,});
    } catch (error) {
      next(error);
    }
  }
}

export default new AttendanceController();