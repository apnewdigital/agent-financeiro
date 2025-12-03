/* ============================================================
   POLICIES.SQL
   Políticas de segurança do Supabase (Row Level Security)
   Projeto: Agente Financeiro Inteligente
   ------------------------------------------------------------
   - Cada tabela tem suas políticas específicas.
   - Todas as políticas seguem boas práticas de segurança:
       • Usuário só acessa seus próprios dados.
       • Backend (service_role) tem acesso irrestrito.
       • Tabela "categories" permanece pública (RLS OFF).
   ============================================================ */

---------------------------------------------------------------
-- USERS TABLE
-- RLS: Ativado
-- Regras:
--   - Usuário só pode ler/atualizar seu próprio registro
--   - Backend tem acesso total
---------------------------------------------------------------

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own"
ON users
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "users_update_own"
ON users
FOR UPDATE
TO authenticated
USING (id = auth.uid());

CREATE POLICY "users_service_full_access"
ON users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


---------------------------------------------------------------
-- MESSAGES TABLE
-- RLS: Ativado
-- Regras:
--   - Usuário só pode ler mensagens dele mesmo
--   - Usuário só insere mensagens com o próprio ID
--   - Backend pode tudo
---------------------------------------------------------------

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_own"
ON messages
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "messages_insert_own"
ON messages
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "messages_service_full_access"
ON messages
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


---------------------------------------------------------------
-- TRANSACTIONS TABLE
-- (Já existiam policies, mas mantemos registradas aqui)
-- RLS: Ativado
-- Regras:
--   - Usuário só acessa transações dele
--   - Backend tem acesso total
---------------------------------------------------------------

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transactions_select_own"
ON transactions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "transactions_insert_own"
ON transactions
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "transactions_update_own"
ON transactions
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "transactions_service_full_access"
ON transactions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


---------------------------------------------------------------
-- LOGS TABLE
-- RLS: Ativado
-- Regras:
--   - Somente o backend pode gravar/logar erros
--   - Usuário NUNCA vê os logs
---------------------------------------------------------------

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "logs_insert_service"
ON logs
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "logs_select_service"
ON logs
FOR SELECT
TO service_role
USING (true);


---------------------------------------------------------------
-- CATEGORIES TABLE
-- RLS: DESATIVADO (mantido público)
-- Motivo:
--   - Apenas leitura
--   - Não contém informações sensíveis
--   - Necessário para classificação de transações
---------------------------------------------------------------

-- Nenhuma policy aplicada. Mantido sem RLS.
