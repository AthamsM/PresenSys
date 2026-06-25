import AlunoService from '../services/alunoService.js';

class AlunoController {
  async create(req, res, next) {
    try {
      const novoAluno = await AlunoService.create(req.body);
      return res.status(201).json(novoAluno);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const alunos = await AlunoService.findAll();
      return res.status(200).json(alunos);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const aluno = await AlunoService.findById(req.params.id);
      return res.status(200).json(aluno);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const alunoAtualizado = await AlunoService.update(req.params.id, req.body);
      return res.status(200).json(alunoAtualizado);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await AlunoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AlunoController();