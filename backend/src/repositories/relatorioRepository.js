import prisma from '../config/database.js';

class RelatorioRepository {
  async getFaltasPorAluno() {
    return prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
        matricula: true,
        _count: {
          where: { frequencias: { some: { presente: false } } },
          select: { frequencias: true }
        }
      }
    });
  }

  async getFaltasPorTurma(turmaId) {
    return prisma.aluno.findMany({
      where: { turmaId },
      select: {
        id: true,
        nome: true,
        matricula: true,
        _count: {
          where: { frequencias: { some: { presente: false } } },
          select: { frequencias: true }
        }
      }
    });
  }

  async getFaltasPorSerie() {
    const turmas = await prisma.turma.findMany({
      include: {
        alunos: {
          include: {
            frequencias: {
              where: { presente: false }
            }
          }
        }
      }
    });

    const relatorioSerie = {};
    turmas.forEach(turma => {
      let faltasTurma = 0;
      turma.alunos.forEach(aluno => {
        faltasTurma += aluno.frequencias.length;
      });

      if (!relatorioSerie[turma.serie]) {
        relatorioSerie[turma.serie] = 0;
      }
      relatorioSerie[turma.serie] += faltasTurma;
    });

    return relatorioSerie;
  }

  async getDadosPresencaAluno(alunoId) {
    return prisma.frequencia.findMany({
      where: { alunoId }
    });
  }
}

export default new RelatorioRepository();