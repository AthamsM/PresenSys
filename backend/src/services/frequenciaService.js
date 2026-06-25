import FrequenciaRepository from '../repositories/frequenciaRepository.js';

class FrequenciaService {
  async registrarChamada(data, chamada) {
    if (!data || !Array.isArray(chamada) || chamada.length === 0) {
      const error = new Error('Dados da chamada inválidos.');
      error.statusCode = 400;
      throw error;
    }

    // Mapeia para garantir o formato correto de data YYYY-MM-DD para o banco
    const registrosformatados = chamada.map((item) => ({
      alunoId: Number(item.alunoId),
      data: data, 
      presente: Boolean(item.presente),
    }));

    // O repositório utiliza Upsert garantindo que se já existir para o aluno na data, ele atualiza,
    // evitando duplicidade e permitindo correções da chamada do dia.
    return FrequenciaRepository.registrarEmLote(registrosformatados);
  }
}

export default new FrequenciaService();