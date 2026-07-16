
class ClassRepository {
  async create(data, prisma) {
    return prisma.class.create({ data });
  }

  async findAll(prisma) {
    return prisma.class.findMany({ include: { _count: { select: { students: true } } } });
  }

  async findById(id, prisma) {
    return prisma.class.findUnique({ where: { id }, include: { students: true } });
  }

  async update(id, data, prisma) {
    return prisma.class.update({ where: { id }, data });
  }

  async delete(id, prisma) {
    return prisma.class.delete({ where: { id } });
  }
}

export default new ClassRepository();