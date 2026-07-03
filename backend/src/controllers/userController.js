import UserService from "../services/userService.js";

class UserController {

    async register(req, res, next) {
        try {
            const newUser = await UserService.register(req.body);
            return res.status(201).json({nome: newUser.nome, role: newUser.role});
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const student = await UserService.findAll();
            return res.status(200).json(student);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const login = await UserService.login(req.body);
            return res.status(201).json({token: login});
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const userUpdated = await UserService.update(req.params.id, req.body);
            return res.status(200).json(userUpdated);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await UserService.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();