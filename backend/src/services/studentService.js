import StudentRepository from '../repositories/studentRepository.js';
import ClassRepository from '../repositories/classRepository.js';

class StudentService {
  async create(data) {
    if (!data.name || !data.enrollment || !data.classId) {
      const error = new Error('Campos obrigatórios ausentes.');
      error.statusCode = 400;
      throw error;
    }

    const classExist = await ClassRepository.findById(Number(data.classId));
    if (!classExist) {
      const error = new Error('A turma informada não existe.');
      error.statusCode = 404;
      throw error;
    }

    const enrollmentExist = await StudentRepository.findByEnrollment(data.enrollment);
    if (enrollmentExist) {
      const error = new Error('Já existe um aluno com esta matrícula.');
      error.statusCode = 409;
      throw error;
    }

    return StudentRepository.create({
      name: data.name,
      enrollment: data.enrollment,
      classId: Number(data.classId)
    });
  }

  async findAll() {
    return StudentRepository.findAll();
  }

  async findByEnrollment(enrollment) {
    const student = await StudentRepository.findByEnrollment(enrollment);
    if (!student) {
      const error = new Error('Aluno não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return student;
  }

  async update(id, data) {
    await this.findById(id);
    return StudentRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return StudentRepository.delete(Number(id));
  }
}

export default new StudentService();