import TurmaRepository from '../repositories/turmaRepository.js';

class TurmaService {
  async create(data) {
    if (!data.nome || !data.serie || !data.anoLetivo) {
      const error = new Error('Todos os campos (nome, serie, anoLetivo) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }
    return TurmaRepository.create(data);
  }

  async findAll() {
    return TurmaRepository.findAll();
  }

  async findById(id) {
    const turma = await TurmaRepository.findById(Number(id));
    if (!turma) {
      const error = new Error('Turma não encontrada');
      error.statusCode = 404;
      throw error;
    }
    return turma;
  }

  async update(id, data) {
    await this.findById(id);
    return TurmaRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return TurmaRepository.delete(Number(id));
  }
}

export default new TurmaService();