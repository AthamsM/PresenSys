import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/database.js';

describe('Testes de Integração - Turmas', () => {
  // Limpa o banco de dados antes de rodar os testes para evitar poluição
  beforeAll(async () => {
    await prisma.frequencia.deleteMany({});
    await prisma.aluno.deleteMany({});
    await prisma.turma.deleteMany({});
  });

  // Desconecta do banco após terminar
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve ser possível criar uma nova turma com sucesso', async () => {
    const response = await request(app)
      .post('/api/turmas')
      .send({
        nome: 'B',
        serie: '7º Ano',
        anoLetivo: 2026
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('B');
  });

  it('Não deve permitir criar uma turma sem os campos obrigatórios', async () => {
    const response = await request(app)
      .post('/api/turmas')
      .send({
        nome: 'C'
        // Faltando serie e anoLetivo
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toContain('Todos os campos (nome, serie, anoLetivo) são obrigatórios.');
  });

  it('Deve listar todas as turmas cadastradas', async () => {
    const response = await request(app).get('/api/turmas');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});