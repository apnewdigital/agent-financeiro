# 📊 Banco de Dados — Documentação Oficial

Este documento descreve toda a estrutura de banco de dados do projeto Agente Financeiro, incluindo tabelas, views, regras de acesso e finalidades de cada elemento.

A base foi projetada para ser:

* **multi-tenant** (cada usuário vê apenas seus dados)
* **escalável**
* compatível com Supabase RLS
* **otimizada para IA e automações**
* simples de integrar com APIs e n8n

---

## 🧱 1. Tabelas Principais

### 1.1. `users`

Armazena os usuários do sistema (vinculados ao WhatsApp).

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `uuid` | PK, mesmo ID do Supabase Auth ou número do WhatsApp |
| `phone` | `text` | Telefone em formato internacional |
| `name` | `text` | Nome do usuário |
| `created_at` | `timestamptz` | Data de criação |

**Finalidade**

Identificar o usuário nas transações e personalizar os relatórios.

### 1.2. `categories`

Categorias de gastos com aliases para classificação automática.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `bigint` | PK |
| `name` | `text` | Nome da categoria |
| `aliases` | `text[]` | Palavras-chave associadas (ex: “restaurante”, “mercado”) |

**Finalidade**

Permitir que a IA classifique gastos de forma inteligente com base em termos enviados pelo usuário.

### 1.3. `transactions`

Registro de gastos enviados pelo usuário.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK → users.id |
| `amount` | `numeric(10,2)` | Valor gasto |
| `category` | `text` | Categoria atribuída |
| `description` | `text` | Texto original enviado no WhatsApp |
| `date` | `date` | Data do gasto |
| `created_at` | `timestamptz` | Registro no sistema |

**Finalidade**

Representar todas as transações que o assistente irá analisar, classificar e consolidar em relatórios.

---

## 🔐 2. Row Level Security (RLS)

O sistema usa RLS para garantir que cada usuário só veja suas próprias transações.

Política aplicada às tabelas:

* `users`: leitura apenas do próprio registro
* `transactions`: leitura e inserção apenas para registros com `user_id` igual ao do token em uso
* `categories`: leitura liberada (não contém dados sensíveis)

Esse modelo é o padrão recomendado pelo Supabase para apps multi-tenant.

---

## 📈 3. Views de Relatórios

(todas são read-only, otimizadas e respeitam RLS automaticamente)

### 3.1. `vw_transactions_detailed`

Visão expandida contendo:

* dados da transação
* dados do usuário
* dados da categoria

**Uso principal:**

Dashboards, relatórios detalhados, IA, análise no n8n.

Colunas incluídas:

| Coluna | Descrição |
| :--- | :--- |
| `transaction_id` | ID da transação |
| `user_id` | ID do usuário |
| `user_name` | Nome do usuário |
| `amount` | Valor |
| `category` | Categoria |
| `description` | Texto enviado |
| `date` | Data |
| `category_name` | Nome da categoria |
| `category_aliases` | Aliases |
| `created_at` | Registro do sistema |

### 3.2. `vw_monthly_totals`

Resumo mensal por usuário.

Retorna:

* total gasto
* quantidade de transações
* mês agrupado

**Uso principal:**

Resumo financeiro mensal, dashboards e relatórios automáticos.

### 3.3. `vw_monthly_by_category`

Resumo mensal por categoria.

Retorna:

* categoria
* total gasto naquele mês
* número de transações

**Uso principal:**

Breakdowns mensais e relatórios granulares.

### 3.4. `vw_daily_totals`

Total diário por usuário.

**Uso principal:**

Alertas, notificações, análises de picos de gastos.

### 3.5. `vw_categories_usage`

Mostra como cada usuário usa as categorias.

Retorna:

* categorias mais usadas
* somatório por categoria

**Uso principal:**

Insights personalizados para IA.

---

## 🔗 4. Exemplos de uso via API REST (Supabase)

**Resumo mensal:**

`GET /rest/v1/vw_monthly_totals?user_id=eq.UUID`

**Resumo por categoria em um mês:**

`GET /rest/v1/vw_monthly_by_category?user_id=eq.UUID&month=eq.2025-02-01`

**Transações detalhadas:**

`GET /rest/v1/vw_transactions_detailed?user_id=eq.UUID`

---

## 📘 5. Fluxo de Processamento da IA

1.  Usuário envia um texto no WhatsApp
2.  IA interpreta e extrai:
    * valor
    * categoria (via aliases)
    * descrição
3.  API salva em `transactions`
4.  Views consolidam automaticamente
5.  Relatórios podem ser extraídos via:
    * API
    * n8n
    * IA
    * Power BI

---

## 🧩 6. Estrutura SQL do Projeto (resumo)

| Arquivo | Função |
| :--- | :--- |
| `schema.sql` | Define tabelas |
| `inserts.sql` | Popular categorias / dados iniciais |
| `views.sql` | Cria todas as views |
| `policies.sql` (futuro) | Centralizar as políticas RLS |
| `migrations/` (futuro) | Scripts de versionamento avançado |

---

## 🧭 7. Conclusão

A estrutura do banco foi construída com foco em:

* **alta escalabilidade**
* **segurança via RLS**
* **compatibilidade com IA**
* facilidade de manutenção
* relatórios completos para usuários

Com isso, seu agente financeiro já está pronto para:

* automatizar análises
* gerar dashboards
* fornecer insights inteligentes
* expandir para outros serviços