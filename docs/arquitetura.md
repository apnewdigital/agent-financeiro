# Arquitetura do Sistema — Agente Financeiro IA

## Objetivo do documento
Descrever em detalhes a arquitetura do sistema, responsabilidades de cada componente, fluxos de dados e considerações de segurança e escala.

## Visão de alto nível
```
Usuário (WhatsApp / Telegram / Webchat)
        │
        ▼
Provider Messaging API (WhatsApp Cloud API / Z-API / Ultramsg)
        │
        ▼
n8n (Orquestrador de Workflows)  <--->  Railway / Backend APIs (opcional)
        │
        ▼
OpenAI (parsing, intent detection, generation)
        │
        ▼
Supabase (Postgres): dados persistidos, RLS, storage
        │
        ▼
Dashboards / BI (Power BI / Metabase) / Exports
```

## Componentes e responsabilidades

### Provider Messaging API
- Recebe/encaminha mensagens do canal (WhatsApp, Telegram…).
- Recomendado: usar um provider com webhook simples e suporte a mídia.
- Requisitos: TLS, retry, rate limits configuráveis.

### n8n (orquestrador)
- Centraliza a lógica sem código (low-code) dos fluxos.
- Ações típicas:
  - Receber webhook do provider.
  - Normalizar payload (telefone, texto, mídia, timestamp).
  - Chamar OpenAI para parsing/intent detection.
  - Validar/transformar resultado (JSON schema validation).
  - Inserir/consultar Supabase via node Postgres/HTTP.
  - Enviar resposta via provider (WhatsApp API).
- Observação: mantenha workflows mínimos e delegue regras de negócio complexas ao backend quando necessário.

### OpenAI (IA)
- Funções:
  - Extrair valor, data, categoria e descrição de texto livre.
  - Detectar intents (registrar gasto, pedir resumo, exportar, editar).
  - Gerar mensagens amigáveis para o usuário (resumos, insights).
- Práticas recomendadas:
  - Use temperature = 0.0–0.2 para parsing determinístico.
  - Forneça exemplos no prompt e schema JSON esperado.
  - Trate casos de erro e re-prompts (fall-back prompts).

### Supabase (Postgres)
- Armazenamento das entidades: users, transactions, categories, messages, logs.
- Habilitar RLS (Row-Level Security) para isolar dados por usuário.
- Criar views/materialized views para consultas frequentes (resumos mensais, top categorias).
- Backup regular & política de retenção.

### Railway / Backend (opcional)
- Funções que justificam código customizado:
  - Endpoints seguros para dashboards/contas empresariais.
  - Workers para processamentos pesados (reclassificação em lote, ETL).
  - Integrações com provedores bancários Open Finance.
- Design: API REST/GraphQL, autenticação via JWT, logs estruturados.

## Considerações de segurança
- TLS obrigatório em todos endpoints.
- Secrets em vault (Railway/Supabase envs) – não usar `.env` em produção.
- Monitorar e limitar tokens da OpenAI por usuário/conta.
- GDPR/LGPD: termos claros, opção de deleção de dados, exportação de dados via API.

## Escala & Resiliência
- Caching: considerar Redis para consultas intensivas (top categorias).
- Particionar dados por usuário para consultas grandes.
- Monitoramento: Sentry/Datadog + alertas (erro 5xx, latência alta, falhas OpenAI > 5%).
- Estratégia de retry e dead-letter queue para falhas de workflow (n8n ou backend).

---
# Notas finais
Arquitetura modular para permitir evolução suave: comece com n8n + Supabase (baixo custo) e migre funcionalidades para backend conforme complexidade e volume crescem.
