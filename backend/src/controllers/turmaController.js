import TurmaService from '../services/turmaService.js';

class TurmaController {
  async create(req, res, next) {
    try {
      const novaTurma = await TurmaService.create(req.body);
      return res.status(201).json(novaTurma);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const turmas = await TurmaService.findAll();
      return res.status(200).json(turmas);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const turma = await TurmaService.findById(req.params.id);
      return res.status(200).json(turma);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const turmaAtualizada = await TurmaService.update(req.params.id, req.body);
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await TurmaService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new TurmaController();