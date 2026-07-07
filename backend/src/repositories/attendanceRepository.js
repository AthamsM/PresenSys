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
}

export default new AttendanceRepository();