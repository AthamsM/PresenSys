import ClassRepository from '../repositories/classRepository.js';

class classService {
  async create(data) {
    if (!data.name || !data.grade || !data.schoolYear) {
      const error = new Error('Todos os campos (name, grade, schoolYear) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }
    return ClassRepository.create(data);
  }

  async findAll() {
    return ClassRepository.findAll();
  }

  async findById(id) {
    const classs = await ClassRepository.findById(Number(id));
    if (!classs) {
      const error = new Error('turma não encontrada');
      error.statusCode = 404;
      throw error;
    }
    return classs;
  }

  async update(id, data) {
    await this.findById(id);
    return ClassRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return ClassRepository.delete(Number(id));
  }
}

export default new classService();