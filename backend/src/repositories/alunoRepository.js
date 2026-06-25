import prisma from '../config/database.js';

class AlunoRepository {
  async create(data) {
    return prisma.aluno.create({ data });
  }

  async findAll() {
    return prisma.aluno.findMany({ include: { turma: true } });
  }

  async findById(id) {
    return prisma.aluno.findUnique({ where: { id }, include: { turma: true } });
  }

  async findByMatricula(matricula) {
    return prisma.aluno.findUnique({ where: { matricula } });
  }

  async update(id, data) {
    return prisma.aluno.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.aluno.delete({ where: { id } });
  }
}

export default new AlunoRepository();