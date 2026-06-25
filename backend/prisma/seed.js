import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando a população do banco de dados...');

  // 1. Limpa dados antigos para não duplicar se rodar duas vezes
  await prisma.frequencia.deleteMany({});
  await prisma.aluno.deleteMany({});
  await prisma.turma.deleteMany({});

  // 2. Criação das Turmas
  const turmaA = await prisma.turma.create({
    data: {
      nome: 'A',
      serie: '6º Ano',
      anoLetivo: 2026,
    },
  });

  const turmaB = await prisma.turma.create({
    data: {
      nome: 'B',
      serie: '7º Ano',
      anoLetivo: 2026,
    },
  });

  console.log('Turmas criadas com sucesso!');

  // 3. Criação dos Alunos para o 6º Ano A
  await prisma.aluno.createMany({
    data: [
      { nome: 'Athams Menezes', matricula: '20260001', turmaId: turmaA.id },
      { nome: 'Manuel Silva', matricula: '20260002', turmaId: turmaA.id },
      { nome: 'Carlos Eduardo', matricula: '20260003', turmaId: turmaA.id },
      { nome: 'Ana Beatriz', matricula: '20260004', turmaId: turmaA.id },
    ],
  });

  // 4. Criação dos Alunos para o 7º Ano B
  await prisma.aluno.createMany({
    data: [
      { nome: 'Mariana Costa', matricula: '20260005', turmaId: turmaB.id },
      { nome: 'Pedro Henrique', matricula: '20260006', turmaId: turmaB.id },
      { nome: 'Julia Souza', matricula: '20260007', turmaId: turmaB.id },
    ],
  });

  console.log('Alunos inseridos com sucesso!');
  console.log('Banco de dados pronto para testes!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });