import AttendanceService from '../services/attendanceService.js';

class AttendanceController {
  async register(req, res, next) {
    try {
      const { date, attendance } = req.body;
      const result = await AttendanceService.register(date, attendance);
      return res.status(200).json({ message: 'Chamada registrada com sucesso!', quantidade: result.length });
    } catch (error) {
      next(error);
    }
  }
}

export default new AttendanceController();