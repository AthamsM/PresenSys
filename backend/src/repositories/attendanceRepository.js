import prisma from '../config/database.js';

class AttendanceRepository {

  async registerInBatch(register) {
    return prisma.$transaction(
      register.map((reg) =>
        prisma.attendance.upsert({
          where: {
            studentId_date: {
              studentId: reg.studentId,
              date: new Date(reg.date),
            },
          },
          update: { present: reg.present },
          create: {
            studentId: reg.studentId,
            date: new Date(reg.date),
            present: reg.present,
          },
        })
      )
    );
  }

  async foulsPerMonth(year) {

    const startDate = new Date(`${year}-01-01T00:00:00`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    return prisma.$queryRaw`
    
      SELECT EXTRACT(month FROM date)::int AS mnt, COUNT(*)::int AS fouls FROM "attendance" 
      WHERE date >= ${startDate} AND date <= ${endDate} AND present = false 
      GROUP BY mnt
      ORDER BY mnt ASC;
    
    `;

  }

  async studentsMostFouls(year) {

    const mostFouls = await prisma.attendance.groupBy({

      by: 'studentId', 
      where: {date : {gte: new Date(`${year}-01-01T00:00:00`), lte: new Date(`${year}-12-31T23:59:59`)}, present: false},
      _count: {studentId: true},
      orderBy: { _count: {studentId: 'desc'}},
      take: 10,

    });

    const students = await prisma.student.findMany({where: {id: {in: mostFouls.map(fouls => fouls.studentId)}}});

    return mostFouls.map(fouls => ({

      student: students.find(student => student.id === fouls.studentId),
      fouls: fouls._count.studentId,

    }));

  }

  async classesMostFouls(year) {

    const mostFouls = await prisma.attendance.groupBy({

      by: "studentId", 
      where: {date : {gte: new Date(`${year}-01-01T00:00:00`), lte: new Date(`${year}-12-31T23:59:59`)}, present: false},
      _count: {studentId: true},

    });

    const students = await prisma.student.findMany({where: {id: {in: mostFouls.map(fouls => fouls.studentId)}}, include: {class: true}});

    const totalFouls = mostFouls.map(fouls => ({

      classes: students.find(student => student.id === fouls.studentId).class,
      fouls: fouls._count.studentId,

    }));

    return totalFouls.filter(total => total.classes.schoolYear == year);

  }
  
}

export default new AttendanceRepository();