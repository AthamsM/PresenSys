import RelatorioService from '../services/relatorioService.js';

class RelatorioController {
  async listarFaltasPorAluno(req, res, next) {
    try {
      const relatorio = await RelatorioService.listarFaltasPorAluno();
      return res.status(200).json(relatorio);
    } catch (error) {
      next(error);
    }
  }

  async listarFaltasPorTurma(req, res, next) {
    try {
      const relatorio = await RelatorioService.listarFaltasPorTurma(req.params.turmaId);
      return res.status(200).json(relatorio);
    } catch (error) {
      next(error);
    }
  }

  async listarFaltasPorSerie(req, res, next) {
    try {
      const relatorio = await RelatorioService.listarFaltasPorSerie();
      return res.status(200).json(relatorio);
    } catch (error) {
      next(error);
    }
  }

  async calcularPercentualPresenca(req, res, next) {
    try {
      const resultado = await RelatorioService.calcularPercentualPresenca(req.params.alunoId);
      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

export default new RelatorioController();