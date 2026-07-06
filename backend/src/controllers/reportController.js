import ReportService from '../services/reportService.js';

class ReportController {

  async getFoulAll(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      const result = await ReportService.getFoulAll(
        startDate,
        endDate
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
        endDate
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFoulSerie(req, res, next) {
    try {
      const { serie, startDate, endDate } = req.query;

      const result = await ReportService.getFoulSerie(
        serie,
        startDate,
        endDate
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
        endDate
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFoulSerieInClass(req, res, next) {
    try {
      const { serie, className, startDate, endDate } = req.query;

      const result = await ReportService.getFoulSerieInClass(
        serie,
        className,
        startDate,
        endDate
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ReportController();