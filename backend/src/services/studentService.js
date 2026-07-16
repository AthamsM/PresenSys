import StudentRepository from '../repositories/studentRepository.js';
import ClassRepository from '../repositories/classRepository.js';

class StudentService {
  async create(data, prisma) {
    if (!data.name || !data.enrollment || !data.classId) {
      const error = new Error('Campos obrigatórios ausentes.');
      error.statusCode = 400;
      throw error;
    }

    const classExist = await ClassRepository.findById(Number(data.classId), prisma);
    if (!classExist) {
      const error = new Error('A turma informada não existe.');
      error.statusCode = 404;
      throw error;
    }

    const enrollmentExist = await StudentRepository.findByEnrollment(data.enrollment, prisma);
    if (enrollmentExist) {
      const error = new Error('Já existe um aluno com esta matrícula.');
      error.statusCode = 409;
      throw error;
    }

    return StudentRepository.create({
      name: data.name,
      enrollment: data.enrollment,
      classId: Number(data.classId),
      prisma
    });
  }

  async findAll(prisma) {
    return StudentRepository.findAll(prisma);
  }

  async findById(id, prisma) {
    const student = await StudentRepository.findById(Number(id), prisma);
    if (!student) {
      const error = new Error('Aluno não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return student;
  }

  async update(id, data, prisma) {
    await this.findById(id, prisma);
    return StudentRepository.update(Number(id), data, prisma);
  }

  async delete(id, prisma) {
    await this.findById(id, prisma);
    return StudentRepository.delete(Number(id), prisma);
  }
}

export default new StudentService();