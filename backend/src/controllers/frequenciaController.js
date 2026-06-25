import FrequenciaService from '../services/frequenciaService.js';

class FrequenciaController {
  async registrarChamada(req, res, next) {
    try {
      const { data, chamada } = req.body;
      const resultado = await FrequenciaService.registrarChamada(data, chamada);
      return res.status(200).json({ message: 'Chamada registrada com sucesso!', quantidade: resultado.length });
    } catch (error) {
      next(error);
    }
  }
}

export default new FrequenciaController();