/**
 * transactionsController.js
 * - Recebe chamadas para criar/listar transações.
 * - Usa validateTransaction para checar dados mínimos.
 * - Usa transactionsService.processTransactionData para pré-processamento.
 *
 * RLS:
 * - As policies do Supabase garantem que usuários apenas leiam/escrevam o que lhes pertence.
 * - Aqui a API usa a anon-key (público), por isso os inserts diretos exigem que o client (n8n/backend)
 *   envie user_id correto. Em produção, endpoints que realizam operações delicadas devem usar service_role
 *   ou um backend com autenticação própria.
 */

import { supabase } from '../supabase/client.js';
import { validateTransaction } from '../utils/validateInput.js';
import { processTransactionData } from '../services/transactionsService.js';

/**
 * createTransaction(req, res)
 * Body esperado: { user_id, amount, category, description?, date? , raw_text?, meta? }
 */
export async function createTransaction(req, res) {
  try {
    // Validação básica
    const validation = validateTransaction(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    // Processamento / normalização
    const tx = processTransactionData(req.body);

    const { user_id, amount, category, description, date, raw_text, meta } = tx;

    // Inserção no Supabase
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id,
          amount,
          category,
          description: description || null,
          date: date,         // já normalizada no service
          raw_text: raw_text || null,
          meta: meta || null
        }
      ])
      .select();

    if (error) {
      // Possível FK error se user_id não existir (tratado no cliente)
      return res.status(500).json({ error: error.message || error });
    }

    return res.status(201).json({
      message: 'Transação registrada',
      transaction: data[0]
    });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'internal_error' });
  }
}

/**
 * listTransactions(req, res)
 * Query params: ?user_id=<uuid>
 * Retorna a view vw_transactions_detailed para facilitar o front.
 */
export async function listTransactions(req, res) {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id é obrigatório' });

    const { data, error } = await supabase
      .from('vw_transactions_detailed')
      .select('*')
      .eq('user_id', user_id)
      .order('date', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message || error });
    }

    return res.status(200).json({ transactions: data });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'internal_error' });
  }
}
