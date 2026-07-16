import { getPrisma } from "../config/database.js";
import UserService from "../services/userService.js";

class UserController {

    async register(req, res, next) {
        try {
            const newUser = await UserService.register(req.body);
            return res.status(201).json({name: newUser.name, email: newUser.email, role: newUser.role});
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const users = await UserService.findAll(req.prisma);
            return res.status(200).json(
                users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            })));
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const prisma = getPrisma(req.body.school);
            const token = await UserService.login(req.body, prisma);
            return res.status(201).json({ token: token});
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const userUpdated = await UserService.update(req.params.id, req.body, req.prisma);
            return res.status(200).json({name: userUpdated.name, email: userUpdated.email, role: userUpdated.role});
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