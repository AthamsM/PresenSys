import prisma from '../config/database.js';

class ClassRepository {
  async create(data) {
    return prisma.class.create({ data });
  }

  async findAll() {
    return prisma.class.findMany({ include: { _count: { select: { students: true } } } });
  }

  async findById(id) {
    return prisma.class.findUnique({ where: { id }, include: { students: true } });
  }

  async update(id, data) {
    return prisma.class.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.class.delete({ where: { id } });
  }
}

export default new ClassRepository();