import prisma from '../config/database.js';

class StudentRepository {
  async create(data) {
    return prisma.student.create({ data });
  }

  async findAll() {
    return prisma.student.findMany({ include: { class: true } });
  }

  async findById(id) {
    return prisma.student.findUnique({ where: { id }, include: { class: true } });
  }

  async findByEnrollment(enrollment) {
    return prisma.student.findUnique({ where: { enrollment } });
  }

  async update(id, data) {
    return prisma.student.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.student.delete({ where: { id } });
  }
}

export default new StudentRepository();