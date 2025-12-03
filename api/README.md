# API — Agente Financeiro (Backend)

> Esta pasta contém um backend mínimo que pode ser usado como complemento ao n8n para validações, autenticações e endpoints customizados.

## Scripts
- `npm run dev` — inicia o servidor em modo desenvolvimento

## Estrutura sugerida
```
/api/src
  /controllers    # handlers HTTP
  /services       # integração com OpenAI, WhatsApp, etc.
  /database       # cliente de conexão Supabase/Postgres
  /utils          # helpers e middlewares (auth, validation)
```

## Endpoints (exemplo)
- `POST /webhook` — endpoint que pode receber webhooks do provedor ou n8n
- `POST /transactions` — criar transação (body validated)
- `GET /transactions/:userId/:year/:month` — listar por mês

## Boas práticas
- Validar JWT / Bearer token em endpoints públicos
- Rate-limit por IP/usuário
- Usar logs estruturados (JSON) para facilitar observability
