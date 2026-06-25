import prisma from '../config/database.js';

class TurmaRepository {
  async create(data) {
    return prisma.turma.create({ data });
  }

  async findAll() {
    return prisma.turma.findMany({ include: { _count: { select: { alunos: true } } } });
  }

  async findById(id) {
    return prisma.turma.findUnique({ where: { id }, include: { alunos: true } });
  }

  async update(id, data) {
    return prisma.turma.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.turma.delete({ where: { id } });
  }
}

export default new TurmaRepository();