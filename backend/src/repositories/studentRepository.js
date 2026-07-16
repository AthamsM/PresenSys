class StudentRepository {
  async create(data, prisma) {
    return prisma.student.create({ data });
  }

  async findAll(prisma) {
    return prisma.student.findMany({ include: { class: true } });
  }

  async findById(id, prisma) {
    return prisma.student.findUnique({ where: { id }, include: { class: true } });
  }

  async findByEnrollment(enrollment, prisma) {
    return prisma.student.findUnique({ where: { enrollment } });
  }

  async update(id, data, prisma) {
    return prisma.student.update({ where: { id }, data });
  }

  async delete(id, prisma) {
    return prisma.student.delete({ where: { id } });
  }
}

export default new StudentRepository();