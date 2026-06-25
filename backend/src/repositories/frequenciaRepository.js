import prisma from '../config/database.js';

class FrequenciaRepository {
  async findByAlunoEData(alunoId, data) {
    return prisma.frequencia.findUnique({
      where: {
        alunoId_data: {
          alunoId,
          data: new Date(data),
        },
      },
    });
  }

  async registrarEmLote(registros) {
    return prisma.$transaction(
      registros.map((reg) =>
        prisma.frequencia.upsert({
          where: {
            alunoId_data: {
              alunoId: reg.alunoId,
              data: new Date(reg.data),
            },
          },
          update: { presente: reg.presente },
          create: {
            alunoId: reg.alunoId,
            data: new Date(reg.data),
            presente: reg.presente,
          },
        })
      )
    );
  }
}

export default new FrequenciaRepository();