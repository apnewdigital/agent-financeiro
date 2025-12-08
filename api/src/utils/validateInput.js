/**
 * validateInput.js
 * Funções utilitárias para validação simples de payloads.
 * Ideal para manter validação centralizada e fácil de estender.
 */

/**
 * validateTransaction(body)
 * - Valida os campos mínimos para criar uma transação.
 * - Retorna { success: boolean, error?: string }
 */
export function validateTransaction(body) {
  const { user_id, amount } = body;

  if (!user_id) {
    return { success: false, error: "user_id é obrigatório" };
  }

  // amount pode vir como string (ex: "12.50") — validar conversão
  const parsed = Number(amount);
  if (amount === undefined || Number.isNaN(parsed)) {
    return { success: false, error: "amount deve ser um número válido" };
  }

  // Se tudo ok
  return { success: true };
}
