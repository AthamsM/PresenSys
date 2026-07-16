

class UserRepository {
    async create(data, prisma){
        return prisma.user.create({data});
    }

    async findAll(prisma) {
        return prisma.user.findMany();
    } 

    async findById(id, prisma){
        return prisma.user.findUnique({ where: {id} });
    }

    async findByEmail(email, prisma){
        return prisma.user.findUnique({ where: { email } });
    }

    async update(id, data, prisma) {
        return prisma.user.update({ where: { id}, data });
    }

    async delete(id, prisma) {
        return prisma.user.delete({ where: { id } });
    }

}

export default new UserRepository();