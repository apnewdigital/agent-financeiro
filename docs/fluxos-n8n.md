# Fluxos n8n — Documentação Técnica (node-a-node)

Neste documento está descrito cada workflow essencial com detalhes de nodes, parâmetros e tratamentos de erro.

## Fluxo A — Registrar gasto (core)
**Objetivo:** receber mensagem do usuário, extrair informações de gasto e persistir.

Nodes (ordem):
1. **Webhook (Trigger)** — recebe payload do provedor (ex.: Z-API)
   - Método: POST
   - Autenticação: validar token do provider
   - Salvar payload raw em `messages` via Supabase node (opcional/log)

2. **Function / Transform** — normalizar texto
   - Remover quebras de linha, emojis, espaços duplicados
   - Padronizar vírgula/decimal (ex: "1.200,50" -> "1200.50" ou vice-versa)
   - Extrair possíveis valores via regex como fallback

3. **HTTP Request (OpenAI)** — chamada de parsing
   - Modelo: gpt-4o-mini / gpt-4o (ou modelo acessível)
   - Prompt: usar schema JSON (ver exemplo em /docs/prompts.md)
   - Temperature: 0.0–0.2
   - Max tokens: 200

4. **Function / Validate JSON** — garantir integridade
   - Verificar campos: amount (number), date (YYYY-MM-DD or null), description (string)
   - Em caso de falha: re-prompt (uma vez) ou perguntar ao usuário para clarificar

5. **Supabase Insert (Postgres node or HTTP Request)**
   - Use operação parametrizada
   - Inserir registro em `transactions` com meta e raw_text

6. **Send Reply (HTTP Request -> Provider)**
   - Mensagem de confirmação (usar templates)
   - Se provider suporta interactive buttons, incluir opções: Editar / Confirmar

7. **Error handler branch**
   - Logar erro em tabela `logs`
   - Avisar time via webhook Slack/Telegram (se crítico)
   - Enviar mensagem amigável ao usuário

---

## Fluxo B — Resumo mensal (consulta)
Nodes:
1. Webhook (Trigger)
2. Function: detectar intent (ou chamar OpenAI intent-detector)
3. Supabase Query (SELECT SUM...) — usar parâmetros (user_id, month)
4. Function: formatar resumo textual (e.g., top 3 categorias)
5. Send Reply (HTTP Request)

SQL exemplo (parametrizado):
```sql
SELECT category, SUM(amount) AS total
FROM transactions
WHERE user_id = $1 AND date_trunc('month', date) = date_trunc('month', $2::date)
GROUP BY category
ORDER BY total DESC;
```

Observações críticas:
- Evitar gerar SQL via strings diretas; prefira templates com parâmetros.
- Filtrar por `user_id` sempre para evitar exposição de dados de terceiros.
- Implementar cache para queries pesadas se notar latência.

---

## Fluxo C — Export CSV
- Similar ao fluxo B, mas após query:
  - Converter resultado para CSV (Function node)
  - Upload para Supabase Storage (signed URL)
  - Enviar link ao usuário (expiração curta, ex.: 24h)
- Para arquivos grandes, usar chunked upload e avisar o usuário do progresso.
