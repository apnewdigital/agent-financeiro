-- SQL schema for Agente Financeiro IA (Postgres / Supabase)
-- Critical: run inside a project that supports pgcrypto/gen_random_uuid()
-- If gen_random_uuid() not available, use uuid_generate_v4()

-- Enable extensions (if needed)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL UNIQUE,
  name text,
  email text,
  plan text DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

-- TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL,
  category text,
  description text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  raw_text text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions (user_id, date);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name text NOT NULL UNIQUE,
  aliases text[],
  created_at timestamptz DEFAULT now()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  payload jsonb,
  direction text,
  created_at timestamptz DEFAULT now()
);

-- LOGS
CREATE TABLE IF NOT EXISTS logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text,
  source text,
  message text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

-- RLS example (enable and policies should be applied after configuring Supabase auth)
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY user_can_select_own_transactions
--   ON transactions FOR SELECT USING (auth.uid() = user_id);

-- Note: Implement migration/versioning for schema changes (Flyway/pg-migrate)
