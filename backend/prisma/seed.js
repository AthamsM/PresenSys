import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco...');

  await prisma.frequencia.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.turma.deleteMany();

  const series = ['1º Ano', '2º Ano', '3º Ano'];
  const nomesTurmas = ['A', 'B'];

  const turmasCriadas = [];

  // Criacao das turmas
  for (const serie of series) {
    for (const nomeTurma of nomesTurmas) {
      const turma = await prisma.turma.create({
        data: {
          nome: nomeTurma,
          serie,
          anoLetivo: 2026,
        },
      });

      turmasCriadas.push(turma);
    }
  }

  console.log(`${turmasCriadas.length} turmas criadas`);

  // Criacao dos alunos
  let contadorMatricula = 1;

  for (const turma of turmasCriadas) {
    const alunos = [];

    for (let i = 1; i <= 10; i++) {
      alunos.push({
        nome: `Aluno ${turma.nome} ${i}`,
        matricula: `2026${String(contadorMatricula).padStart(5, '0')}`,
        turmaId: turma.id,
      });

      contadorMatricula++;
    }

    await prisma.aluno.createMany({
      data: alunos,
    });
  }

  console.log('Alunos criados');

  // Frequencias
  const alunos = await prisma.aluno.findMany();

  const dataInicio = new Date('2026-02-02');
  const quantidadeDias = 30;

  for (let dia = 0; dia < quantidadeDias; dia++) {
    const data = new Date(dataInicio);
    data.setDate(dataInicio.getDate() + dia);

    // Ignora sábado e domingo
    if (data.getDay() === 0 || data.getDay() === 6) {
      continue;
    }

    const frequencias = alunos.map((aluno) => ({
      alunoId: aluno.id,
      data,
      // 90% de chance de presença
      presente: Math.random() > 0.10,
    }));

    await prisma.frequencia.createMany({
      data: frequencias,
    });
  }

  console.log('Frequências criadas');
  console.log('Seed finalizada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });