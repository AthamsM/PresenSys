import prisma from "../config/database.js";

class UserRepository {
    async create(data){
        return prisma.user.create({data});
    }

    async findAll() {
        return prisma.user.findMany();
    } 

    async findById(id){
        return prisma.user.findUnique({ where: {id} });
    }

    async findByEmail(email){
        return prisma.user.findUnique({ where: { email } });
    }

    async update(id, data) {
        return prisma.user.update({ where: { id}, data });
    }

    async delete(id) {
        return prisma.user.delete({ where: { id } });
    }

}

export default new UserRepository();