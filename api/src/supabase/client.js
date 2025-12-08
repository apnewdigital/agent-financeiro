/**
 * client.js
 * - Cria e exporta o cliente do Supabase (SDK oficial).
 * - Usa a ANON key por padrão (bom para leitura),
 *   mas você pode criar outro cliente usando SERVICE key quando precisar de privilégios administrativos.
 *
 * Segurança:
 * - Nunca exponha a SERVICE_KEY no frontend.
 * - Em produção, configure as variáveis de ambiente no Railway / CI.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Falha rápida: evita continuar sem as variáveis necessárias.
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.');
}

// Cliente padrão (usado pelo backend para operações normais).
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Observação:
 * - Se precisar fazer tarefas administrativas (criar user no Auth via Admin API),
 *   crie outro cliente com SUPABASE_SERVICE_KEY (service_role) e use apenas em ambiente seguro.
 *
 * Exemplo (não exportado por padrão para evitar vazamento acidental):
 * const admin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false }});
 */
