import prisma from '../config/database.js';

class ReportRepository {

  async getFoulAll(startDate, endDate) {
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
            id: true,
            excusedAbsence: true,
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
      foul: student.attendance.length,
      excusedAbsence: student.attendance.filter(a => typeof a.excusedAbsence === "string" && a.excusedAbsence.trim() != "").length
    }));
  }

  async getFoulClass(className, startDate, endDate) {
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
            id: true,
            excusedAbsence: true
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
      foul: student.attendance.length,
      excusedAbsence: student.attendance.filter(a => typeof a.excusedAbsence === "string" && a.excusedAbsence.trim() != "").length
    }));
  }

async getFoulGrade(grade, startDate, endDate) {
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
            id: true,
            excusedAbsence: true
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
      foul: student.attendance.length,
      excusedAbsence: student.attendance.filter(a => typeof a.excusedAbsence === "string" && a.excusedAbsence.trim() != "").length
    }));
  }
  async getFoulGradeInClass(grade, className, startDate, endDate) {
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
            id: true,
            excusedAbsence: true
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
      foul: student.attendance.length,
      excusedAbsence: student.attendance.filter(a => typeof a.excusedAbsence === "string" && a.excusedAbsence.trim() != "").length
    }));
  }

  async getFoulStudent(id, startDate, endDate) {
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
          date: true,
          excusedAbsence: true
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
      date: f.date,
      justification: typeof f.excusedAbsence === "string" && f.excusedAbsence.trim() !== "" ? f.excusedAbsence.trim() : null
})),

    excusedAbsence: student.attendance.filter(
      f =>
        typeof f.excusedAbsence === "string" &&
        f.excusedAbsence.trim() !== ""
    ).length
  };
}
}

export default new ReportRepository();