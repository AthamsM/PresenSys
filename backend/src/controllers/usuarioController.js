import UsuarioService from "../services/usuarioService.js";

class UsuarioController {

    async create(req, res, next) {
        try {
            const novoUsuario = await UsuarioService.register(req.body);
            return res.status(201).json({nome: novoUsuario.nome, role: novoUsuario.role});
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const alunos = await UsuarioService.findAll();
            return res.status(200).json(alunos);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const login = await UsuarioService.login(req.body);
            return res.status(201).json({token: login});
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const usuarioAtualizado = await UsuarioService.update(req.params.id, req.body);
            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await UsuarioService.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new UsuarioController();