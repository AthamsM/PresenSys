import prisma from '../config/database.js';

class ReportRepository {

  async getFoulAll(startDate, endDate) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.data = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
        matricula: true,
        turma: {
          select: {
            nome: true,
            serie: true
          }
        },
        frequencias: {
          where: {
            presente: false,
            ...filterDate
          },
          select: {
            id: true
          }
        }
      }
    });

    return students.map(student => ({
      id: student.id,
      name: student.nome,
      registration: student.matricula,
      serie: student.turma.serie,
      class: student.turma.nome,
      foul: student.frequencias.length
    }));
  }

  async getFoulClass(className, startDate, endDate) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.data = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.aluno.findMany({
      where: {
        turma: {
          nome: className
        }
      },
      select: {
        id: true,
        nome: true,
        matricula: true,
        turma: {
          select: {
            nome: true,
            serie: true
          }
        },
        frequencias: {
          where: {
            presente: false,
            ...filterDate
          },
          select: {
            id: true
          }
        }
      }
    });

    return students.map(student => ({
      id: student.id,
      name: student.nome,
      registration: student.matricula,
      serie: student.turma.serie,
      class: student.turma.nome,
      foul: student.frequencias.length
    }));
  }

async getFoulSerie(serie, startDate, endDate) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.data = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.aluno.findMany({
      where: {
        turma: {
          serie: serie
        }
      },
      select: {
        id: true,
        nome: true,
        matricula: true,
        turma: {
          select: {
            nome: true,
            serie: true
          }
        },
        frequencias: {
          where: {
            presente: false,
            ...filterDate
          },
          select: {
            id: true
          }
        }
      }
    });

    return students.map(student => ({
      id: student.id,
      name: student.nome,
      registration: student.matricula,
      serie: student.turma.serie,
      class: student.turma.nome,
      foul: student.frequencias.length
    }));
  }
  async getFoulSerieInClass(serie, className, startDate, endDate) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.data = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.aluno.findMany({
      where: {
        turma: {
          serie: serie,
          nome: className
        }
      },
      select: {
        id: true,
        nome: true,
        matricula: true,
        turma: {
          select: {
            nome: true,
            serie: true
          }
        },
        frequencias: {
          where: {
            presente: false,
            ...filterDate
          },
          select: {
            id: true
          }
        }
      }
    });

    return students.map(student => ({
      id: student.id,
      name: student.nome,
      registration: student.matricula,
      serie: student.turma.serie,
      class: student.turma.nome,
      foul: student.frequencias.length
    }));
  }

  async getFoulStudent(id, startDate, endDate) {
  const filterDate = {};

  if (startDate && endDate) {
    filterDate.data = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  const student = await prisma.aluno.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      nome: true,
      matricula: true,
      turma: {
        select: {
          nome: true,
          serie: true
        }
      },
      frequencias: {
        where: {
          presente: false,
          ...filterDate
        },
        select: {
          data: true
        },
        orderBy: {
          data: 'asc'
        }
      }
    }
  });

  if (!student) {
    return null;
  }

  return {
    id: student.id,
    name: student.nome,
    registration: student.matricula,
    serie: student.turma.serie,
    class: student.turma.nome,
    totalFoul: student.frequencias.length,
    foul: student.frequencias.map(f => ({
      data: f.data
    }))
  };
}
}

export default new ReportRepository();