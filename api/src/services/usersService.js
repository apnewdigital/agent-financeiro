/**
 * User Service
 * ------------
 * Contém regras de negócio e operações relacionadas aos usuários.
 * NÃO contém lógica HTTP — isso pertence ao Controller.
 */

import { supabase } from "../supabase/client.js";

/**
 * Cria um novo usuário na tabela `users`.
 * @param {Object} payload - { id, phone, name }
 * @returns {Object} data | error
 */
export async function createUser(payload) {
  const { id, phone, name } = payload;

  // Validação simples
  if (!id || !phone) {
    return {
      error: "MISSING_FIELDS",
      message: "Campos obrigatórios: id, phone",
    };
  }

  // Verifica se já existe
  const existing = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (existing.data) {
    return {
      error: "USER_ALREADY_EXISTS",
      message: "Já existe um usuário com esse ID.",
    };
  }

  // Insere no banco
  const { data, error } = await supabase.from("users").insert([
    {
      id,
      phone,
      name: name || null,
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  return { data };
}

/**
 * Busca um usuário pelo ID.
 * @param {string} id - UUID do usuário vindo do Auth
 * @returns {Object} usuário ou erro
 */
export async function getUserById(id) {
  if (!id) return { error: "ID_REQUIRED" };

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      error: "USER_NOT_FOUND",
      message: "Nenhum usuário encontrado com esse ID",
    };
  }

  return { data };
}

/**
 * Verifica rapidamente se um usuário existe.
 * Útil para futuras integrações com n8n.
 */
export async function userExists(id) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  return !!data;
}
