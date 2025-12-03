# Banco de Dados — Especificação detalhada (Supabase / Postgres)

## Princípios
- Simplicidade: estruturas claras para consultas comuns.
- Segurança: RLS para isolar dados por usuário.
- Observabilidade: logging e auditoria de mensagens brutas.

## Tabelas principais

-- users
- id: uuid PK (gen_random_uuid())
- phone: text UNIQUE NOT NULL
- name: text NULL
- email: text NULL
- plan: text DEFAULT 'free'
- created_at: timestamptz DEFAULT now()

-- transactions
- id: uuid PK
- user_id: uuid FK -> users.id
- amount: numeric(12,2)
- category: text
- description: text
- date: date
- raw_text: text (origem)
- meta: jsonb (por exemplo: {source: 'whatsapp', message_id: '...'})
- created_at: timestamptz DEFAULT now()

-- categories
- id: serial PK
- name: text UNIQUE
- aliases: text[] (sinônimos)
- created_at: timestamptz DEFAULT now()

-- messages
- id: uuid PK
- user_id: uuid NULLABLE
- payload: jsonb (raw provider payload)
- direction: text ('in' or 'out')
- created_at: timestamptz DEFAULT now()

-- logs
- id: uuid PK
- level: text
- source: text
- message: text
- meta: jsonb
- created_at: timestamptz DEFAULT now()

## Views recomendadas (exemplos)
- vw_monthly_summary(user_id, year, month): total por categoria e total geral
- vw_recent_transactions(user_id, limit): últimas N transações

## RLS - exemplo de política (Supabase)
-- Habilitar RLS na tabela transactions
# ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
# CREATE POLICY user_can_select_own ON transactions FOR SELECT USING (auth.uid() = user_id);

-- Observações críticas:
# - Sempre usar queries parametrizadas (pg library / supabase client) ao executar SQL dinâmico.
# - Guardar raw_text e meta para auditoria e permitir reclassificação offline.
# - Documentar e versionar todas as migrations em /sql.
