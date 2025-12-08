/**
 * server.js
 * - Entrada da API Express.
 * - Registra rotas, middlewares e inicia o servidor.
 *
 * Observações de segurança:
 * - Em produção, adicione: logger (p. ex. pino/winston), rate-limiting, helmet, validação de origem (CORS restrito),
 *   proteção contra body too large, monitoramento (Sentry) e testes automatizados.
 */

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import usersRoutes from "./routes/usersRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";

// Carrega variáveis do .env
dotenv.config();

const app = express();

// Middlewares globais
app.use(bodyParser.json());

// Health check – útil para monitoramento ou n8n
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ROTAS
app.use("/users", usersRoutes);
app.use("/transactions", transactionsRoutes);

// Porta (heroku/railway usa process.env.PORT automaticamente)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🔥 Server running on port ${port}`);
});
