import express from "express";
import * as transactionsController from "../controllers/transactionsController.js";

const router = express.Router();

// Criar nova transação
router.post("/", transactionsController.createTransaction);

// Listar transações do usuário
router.get("/user/:user_id", transactionsController.getTransactionsByUser);

// Buscar transação específica
router.get("/:id", transactionsController.getTransactionById);

export default router;
