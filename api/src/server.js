/**
 * server.js
 * - Entrada da API Express.
 * - Registra rotas, middlewares e inicia o servidor.
 *
 * Observações de segurança:
 * - Em produção, adicione: logger (p. ex. pino/winston), rate-limiting, helmet, validação de origem (CORS restrito),
 *   proteção contra body too large, monitoramento (Sentry) e testes automatizados.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { createUser } from './controllers/usersController.js';
import { createTransaction, listTransactions } from './controllers/transactionsController.js';

dotenv.config();

const app = express();

// Middlewares básicos
app.use(cors());             // Em produção, configure `origin` para dominios permitidos
app.use(express.json({ limit: '1mb' })); // Protege contra bodies gigantes

// Rotas - versão minimal, organizadas por controller
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Users
app.post('/api/users', createUser);

// Transactions
app.post('/api/transactions', createTransaction);
app.get('/api/transactions', listTransactions);

// Catch-all para rotas desconhecidas
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler simples (melhore no futuro)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Agent Financeiro API rodando na porta ${PORT}`);
});
