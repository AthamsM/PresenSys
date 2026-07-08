import ClassService from '../services/classService.js';

class ClassController {
  async create(req, res, next) {
    try {
      const newClass = await ClassService.create(req.body);
      return res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const classes = await ClassService.findAll();
      return res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const classs = await ClassService.findById(req.params.id);
      return res.status(200).json(classs);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const classUpdate = await ClassService.update(req.params.id, req.body);
      return res.status(200).json(classUpdate);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ClassService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ClassController();