-- Initial seed data (categories)
INSERT INTO categories (name, aliases) VALUES
('Alimentação', ARRAY['mercado','restaurante','comida','supermercado']),
('Transporte', ARRAY['uber','taxi','passagem','onibus','metro']),
('Assinaturas', ARRAY['netflix','spotify','assinatura']),
('Cartão de Crédito', ARRAY['cartao','fatura','credito']);

-- Example user (for local testing) - replace with real uuid or insert via Supabase auth
-- INSERT INTO users (id, phone, name) VALUES ('00000000-0000-0000-0000-000000000001','5511999999999','Beta Tester');
