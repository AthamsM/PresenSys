# PresenSys

PresenSys é um sistema web para gerenciamento e monitoramento de frequência escolar, permitindo o registro digital de chamadas e a geração automática de relatórios.

## Backend

Acesse a pasta do backend:

```bash
cd ./backend
```

Antes de executar os comandos abaixo, crie e configure o arquivo `.env`, ajustando a URL de conexão com o banco de dados PostgreSQL.

1. Instalar as dependências:

```bash
npm install
```

2. Executar as migrations do banco:

```bash
npm run prisma:migrate
```

3. Executar os testes (opcional):

```bash
npm test
```

4. Iniciar a aplicação:

```bash
npm run dev
```

## Frontend

Acesse a pasta do frontend:

```bash
cd ./frontend
```

1. Instalar dependência:

```bash
npm install
```
