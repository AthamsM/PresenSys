import prisma from "../config/database.js";

class UsuarioRepository {
    async create(data){
        return prisma.usuario.create({data});
    }

    async findAll() {
        return prisma.usuario.findMany();
    } 

    async findById(id){
        return prisma.usuario.findUnique({ where: {id} });
    }

    async findByEmail(email){
        return prisma.usuario.findUnique({ where: { email } });
    }

    async update(id, data) {
        return prisma.usuario.update({ where: { id}, data });
    }

    async delete(id) {
        return prisma.usuario.delete({ where: { id } });
    }

}

export default new UsuarioRepository();