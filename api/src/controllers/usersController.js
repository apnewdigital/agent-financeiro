/**
 * usersController.js
 * - Contém endpoints para manipular a tabela users (apenas o necessário).
 * - Note: a criação do usuário no Supabase Auth (admin) idealmente é feita por n8n ou por uma função protegida
 *   que use a SUPABASE_SERVICE_KEY. Aqui assumimos que o ID do Auth já foi criado e é fornecido.
 */

import { supabase } from '../supabase/client.js';

/**
 * createUser
 * Body esperado:
 * { id: "<uuid-from-auth>", phone: "5511999...", name: "Nome" }
 *
 * Fluxo:
 * - Insere a linha na tabela users usando o UUID retornado pelo Auth
 * - Retorna 201 com o registro criado
 */
export async function createUser(req, res) {
  try {
    const { id, phone, name } = req.body;

    // Validações básicas
    if (!id || !phone) {
      return res.status(400).json({ error: 'id e phone são obrigatórios.' });
    }

    // Inserção: usando supabase.from().insert()
    const { data, error } = await supabase
      .from('users')
      .insert([{ id, phone, name }])
      .select(); // .select() retorna o registro inserido no response

    if (error) {
      // Erro claro para debug (no prod, você pode logar e retornar um erro genérico)
      return res.status(500).json({ error: error.message || error });
    }

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: data[0]
    });

  } catch (err) {
    // Erro inesperado
    return res.status(500).json({ error: err.message || 'internal_error' });
  }
}
