import ClassRepository from '../repositories/classRepository.js';

class classService {
  async create(data, prisma) {
    if (!data.name || !data.grade || !data.schoolYear) {
      const error = new Error('Todos os campos (name, grade, schoolYear) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }
    return ClassRepository.create(data, prisma);
  }

  async findAll(prisma) {
    return ClassRepository.findAll(prisma);
  }

  async findById(id, prisma) {
    const classs = await ClassRepository.findById(Number(id), prisma);
    if (!classs) {
      const error = new Error('turma não encontrada');
      error.statusCode = 404;
      throw error;
    }
    return classs;
  }

  async update(id, data, prisma) {
    await this.findById(id, prisma);
    return ClassRepository.update(Number(id), data, prisma);
  }

  async delete(id, prisma) {
    await this.findById(id, prisma);
    return ClassRepository.delete(Number(id), prisma);
  }
}

export default new classService();