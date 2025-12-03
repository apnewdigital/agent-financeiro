# Roadmap — 12 meses (sprint por sprint)

## Fase 0 — Preparação (0–2 semanas)
- Criar infra básica (Supabase, n8n, conta OpenAI, provedor WhatsApp)
- Scripts SQL iniciais
- Fluxo core: registrar gasto

## Fase 1 — MVP (2–8 semanas)
- Fluxo registrar gasto estável (n8n)
- Consultas principais (resumo mensal, categoria)
- Onboarding e trial (7 dias)
- Lançamento beta (10–50 usuários)

## Fase 2 — Estabilização e canais (2–4 meses)
- Corrigir bugs e ajustar prompts (A/B testing)
- Suporte a Telegram e Instagram DM (adicionar providers)
- Export CSV e integração básica com Power BI

## Fase 3 — Integração Financeira (5–8 meses)
- Integrar via Open Finance (Belvo/Pluggy) para import automático de transações
- Reconciliation engine (combinar notificações com extratos)
- Painel para contadores (B2B)

## Fase 4 — Escala e empresa (9–12 meses)
- Automação de faturamento/recorrência (Stripe/Pagar.me)
- Suporte multi-tenant e white-label
- Time: contratar devs backend, data engineer, CS
- Buscar parcerias com fintechs e contadores

---
# Métricas-chave por fase
- MRR, churn, CAC, LTV
- Taxa de parsing correto (>90%)
- Tempo de resposta médio (<5s para parsing)
