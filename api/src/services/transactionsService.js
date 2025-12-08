/**
 * transactionsService.js
 * Camada de serviços: aqui colocamos regras de negócio que não são diretamente dependentes de Express.
 * Mantém os controllers leves e facilita testes.
 *
 * Atualmente tem função stub que pode ser expandida:
 * - classificação automática por categoria
 * - enriquecimento (ex: identificar estabelecimento via external API)
 * - normalização de valores/datas
 */

export function processTransactionData(tx) {
  // Exemplo simples de enriquecimento:
  // - Garantir que description seja null se vazia
  const processed = { ...tx };
  if (!processed.description) processed.description = null;

  // Normalizar date (pode ser string ou Date)
  if (processed.date) {
    const d = new Date(processed.date);
    processed.date = isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  } else {
    processed.date = new Date().toISOString();
  }

  return processed;
}
