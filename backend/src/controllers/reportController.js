import ReportService from '../services/reportService.js';

class ReportController {

  async getFoulAll(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      const result = await ReportService.getFoulAll(
        startDate,
        endDate,
        req.prisma
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFoulClass(req, res, next) {
    try {
      const { className, startDate, endDate } = req.query;

      const result = await ReportService.getFoulClass(
        className,
        startDate,
        endDate,
        req.prisma
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFoulGrade(req, res, next) {
    try {
      const { grade, startDate, endDate } = req.query;

      const result = await ReportService.getFoulGrade(
        grade,
        startDate,
        endDate,
        req.prisma
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFoulStudent(req, res, next) {
    try {
      const { id, startDate, endDate } = req.query;

      const result = await ReportService.getFoulStudent(
        id,
        startDate,
        endDate,
        req.prisma
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFoulGradeInClass(req, res, next) {
    try {
      const { grade, className, startDate, endDate } = req.query;

      const result = await ReportService.getFoulGradeInClass(
        grade,
        className,
        startDate,
        endDate,
        req.prisma
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ReportController();