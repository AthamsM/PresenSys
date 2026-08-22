import ChartService from '../services/chartService.js';

class ChartController {

  async foulsPerMonth(req, res, next) {

    try {

      const result = await ChartService.foulsPerMonth(req.params.year);
      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }

  }

  async studentsMostFouls(req, res, next) {

    try {

      const result = await ChartService.studentsMostFouls(req.params.year);
      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }

  }

  async classesFouls(req, res, next) {

    try {

      const result = await ChartService.classesFouls(req.params.year);
      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }

  }


}

export default new ChartController();