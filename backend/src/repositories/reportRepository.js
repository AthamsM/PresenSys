
class ReportRepository {

  async getFoulAll(startDate, endDate, prisma) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        enrollment: true,
        class: {
          select: {
            name: true,
            grade: true
          }
        },
        attendance: {
          where: {
            present: false,
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
      name: student.name,
      registration: student.enrollment,
      grade: student.class.grade,
      class: student.class.name,
      foul: student.attendance.length
    }));
  }

  async getFoulClass(className, startDate, endDate, prisma) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.student.findMany({
      where: {
        class: {
          name: className
        }
      },
      select: {
        id: true,
        name: true,
        enrollment: true,
        class: {
          select: {
            name: true,
            grade: true
          }
        },
        attendance: {
          where: {
            present: false,
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
      name: student.name,
      registration: student.enrollment,
      grade: student.class.grade,
      class: student.class.name,
      foul: student.attendance.length
    }));
  }

async getFoulGrade(grade, startDate, endDate, prisma) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.student.findMany({
      where: {
        class: {
          grade: grade
        }
      },
      select: {
        id: true,
        name: true,
        enrollment: true,
        class: {
          select: {
            name: true,
            grade: true
          }
        },
        attendance: {
          where: {
            present: false,
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
      name: student.name,
      registration: student.enrollment,
      grade: student.class.grade,
      class: student.class.name,
      foul: student.attendance.length
    }));
  }
  async getFoulGradeInClass(grade, className, startDate, endDate, prisma) {
    const filterDate = {};

    if (startDate && endDate) {
      filterDate.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const students = await prisma.student.findMany({
      where: {
        class: {
          grade: grade,
          name: className
        }
      },
      select: {
        id: true,
        name: true,
        enrollment: true,
        class: {
          select: {
            name: true,
            grade: true
          }
        },
        attendance: {
          where: {
            present: false,
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
      name: student.name,
      registration: student.enrollment,
      grade: student.class.grade,
      class: student.class.name,
      foul: student.attendance.length
    }));
  }

  async getFoulStudent(id, startDate, endDate, prisma) {
  const filterDate = {};

  if (startDate && endDate) {
    filterDate.date = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  const student = await prisma.student.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      name: true,
      enrollment: true,
      class: {
        select: {
          name: true,
          grade: true
        }
      },
      attendance: {
        where: {
          present: false,
          ...filterDate
        },
        select: {
          date: true
        },
        orderBy: {
          date: 'asc'
        }
      }
    }
  });

  if (!student) {
    return null;
  }

  return {
    id: student.id,
    name: student.name,
    registration: student.enrollment,
    grade: student.class.grade,
    class: student.class.name,
    totalFoul: student.attendance.length,
    foul: student.attendance.map(f => ({
      date: f.date
    }))
  };
}
}

export default new ReportRepository();