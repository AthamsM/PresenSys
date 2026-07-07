import StudentService from '../services/studentService.js';

class StudentController {
  async create(req, res, next) {
    try {
      const newStudent = await StudentService.create(req.body);
      return res.status(201).json(newStudent);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const students = await StudentService.findAll();
      return res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const student = await StudentService.findById(req.params.id);
      return res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const studentUpdate = await StudentService.update(req.params.id, req.body);
      return res.status(200).json(studentUpdate);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await StudentService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();