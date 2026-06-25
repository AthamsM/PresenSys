import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/database.js';

describe('Testes de Integração - Frequência e Relatórios', () => {
  let alunoId;

  beforeAll(async () => {
    await prisma.frequencia.deleteMany({});
    await prisma.aluno.deleteMany({});
    await prisma.turma.deleteMany({});

    const turma = await prisma.turma.create({
      data: { nome: 'A', serie: '6º Ano', anoLetivo: 2026 }
    });

    const aluno = await prisma.aluno.create({
      data: { nome: 'Manuel Silva', matricula: '20260002', turmaId: turma.id }
    });
    alunoId = aluno.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve registrar a chamada salvando a falta do aluno', async () => {
    const response = await request(app)
      .post('/api/frequencias/chamada')
      .send({
        data: '2026-06-15',
        chamada: [
          { alunoId: alunoId, presente: false }
        ]
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Chamada registrada com sucesso!');
  });

  it('Deve atualizar a presença sem duplicar se a chamada for reenviada (Upsert)', async () => {
    // Corrige para "presente: true" na mesma data
    const response = await request(app)
      .post('/api/frequencias/chamada')
      .send({
        data: '2026-06-15',
        chamada: [
          { alunoId: alunoId, presente: true }
        ]
      });

    expect(response.status).toBe(200);

    // Verifica no banco se continuou existindo apenas 1 registro para esse aluno
    const totalRegistros = await prisma.frequencia.count({ where: { alunoId } });
    expect(totalRegistros).toBe(1);
  });

  it('Deve calcular corretamente o percentual de presença no relatório', async () => {
    const response = await request(app).get(`/api/relatorios/aluno/${alunoId}/percentual`);

    expect(response.status).toBe(200);
    expect(response.body.percentualPresenca).toBe('100.00%'); // Mudamos para true no teste anterior
    expect(response.body.diasPresente).toBe(1);
  });
});