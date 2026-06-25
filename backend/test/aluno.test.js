import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/database.js';

describe('Testes de Integração - Alunos', () => {
  let turmaId;

  beforeAll(async () => {
    await prisma.frequencia.deleteMany({});
    await prisma.aluno.deleteMany({});
    await prisma.turma.deleteMany({});

    // Cria uma turma base para vincular os alunos nos testes
    const turma = await prisma.turma.create({
      data: { nome: 'A', serie: '6º Ano', anoLetivo: 2026 }
    });
    turmaId = turma.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve ser possível cadastrar um aluno com sucesso', async () => {
    const response = await request(app)
      .post('/api/alunos')
      .send({
        nome: 'Athams Menezes',
        matricula: '20260001',
        turmaId: turmaId
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('Athams Menezes');
  });

  it('Não deve permitir cadastrar aluno com matrícula duplicada', async () => {
    // Tenta cadastrar com a mesma matrícula do teste anterior
    const response = await request(app)
      .post('/api/alunos')
      .send({
        nome: 'Outro Aluno',
        matricula: '20260001', 
        turmaId: turmaId
      });

    expect(response.status).toBe(409); // Conflict
    expect(response.body.message).toContain('Já existe um aluno com esta matrícula.');
  });
});