import AlunoRepository from '../repositories/alunoRepository.js';
import TurmaRepository from '../repositories/turmaRepository.js';

class AlunoService {
  async create(data) {
    if (!data.nome || !data.matricula || !data.turmaId) {
      const error = new Error('Campos obrigatórios ausentes.');
      error.statusCode = 400;
      throw error;
    }

    const turmaExistente = await TurmaRepository.findById(Number(data.turmaId));
    if (!turmaExistente) {
      const error = new Error('A turma informada não existe.');
      error.statusCode = 404;
      throw error;
    }

    const matriculaExistente = await AlunoRepository.findByMatricula(data.matricula);
    if (matriculaExistente) {
      const error = new Error('Já existe um aluno com esta matrícula.');
      error.statusCode = 409;
      throw error;
    }

    return AlunoRepository.create({
      nome: data.nome,
      matricula: data.matricula,
      turmaId: Number(data.turmaId)
    });
  }

  async findAll() {
    return AlunoRepository.findAll();
  }

  async findById(id) {
    const aluno = await AlunoRepository.findById(Number(id));
    if (!aluno) {
      const error = new Error('Aluno não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return aluno;
  }

  async update(id, data) {
    await this.findById(id);
    return AlunoRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return AlunoRepository.delete(Number(id));
  }
}

export default new AlunoService();