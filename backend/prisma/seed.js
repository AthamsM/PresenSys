import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('trunck db...');

  await prisma.attendance.deleteMany();
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();

  const grades = ['1º Ano', '2º Ano', '3º Ano'];
  const nameClasses = ['A', 'B'];

  const classCreated = [];

  // Criacao das turmas
  for (const grade of grades) {
    for (const nameClass of nameClasses) {
      const clasS = await prisma.class.create({
        data: {
          name: nameClass,
          grade,
          schoolYear: 2026,
        },
      });

      classCreated.push(clasS);
    }
  }

  console.log(`${classCreated.length} Created Class`);

  // Criacao dos alunos
  let contEnrollments = 1;

  for (const clasS of classCreated) {
    const students = [];

    for (let i = 1; i <= 10; i++) {
      students.push({
        name: `Aluno ${clasS.name} ${i}`,
        enrollment: `2026${String(contEnrollments).padStart(5, '0')}`,
        classId: clasS.id,
      });

      contEnrollments++;
    }

    await prisma.student.createMany({
      data: students,
    });
  }

  console.log('create student');

  // Frequencias
  const students = await prisma.student.findMany();

  const startDate = new Date('2026-02-02');
  const numberDays = 30;

  for (let day = 0; day < numberDays; day++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day);

    // Ignora sábado e domingo
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }

    const attendance = students.map((student) => ({
      studentId: student.id,
      date,
      // 90% de chance de presença
      present: Math.random() > 0.10,
    }));

    await prisma.attendance.createMany({
      data: attendance,
    });
  }

  console.log('Create attendance');
  console.log('Seed finalized whith success');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });