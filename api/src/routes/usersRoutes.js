import express from "express";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

// Criar novo usuário
router.post("/", usersController.createUser);

// Buscar usuário pelo ID
router.get("/:id", usersController.getUserById);

export default router;
