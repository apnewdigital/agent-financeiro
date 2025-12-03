# 🤖💰 Agente Financeiro IA
**Automação inteligente de controle financeiro via WhatsApp + IA + Supabase + n8n**

> Repositório inicial do produto mínimo viável (MVP) pensado para escalar até uma plataforma SaaS.
> Foco: captura de gastos por WhatsApp, classificação via IA, armazenamento em PostgreSQL (Supabase) e automação com n8n.

---

## Visão rápida
- Receber mensagens do usuário via WhatsApp (Meta Cloud API / provedor parceiro)
- Orquestrar fluxos com **n8n**
- Interpretar linguagem natural com **OpenAI**
- Persistir dados no **Supabase (Postgres)**
- Expor APIs auxiliares via **Railway / Node.js** (opcional)
- Evoluir para múltiplos canais, integração Open Finance e dashboards Power BI

---

## Arquitetura geral (resumo)
Veja `docs/arquitetura.md` para o diagrama detalhado e explicação das responsabilidades de cada componente.

---

## Como usar este repositório localmente (rápido)
```bash
# clonar repo
git clone https://github.com/SEU-USUARIO/agent-financeiro.git
cd agent-financeiro/api

# instalar dependências
npm install

# criar .env (exemplo)
# SUPABASE_URL=...
# SUPABASE_KEY=...
# OPENAI_API_KEY=...
# WHATSAPP_API_URL=...
# WHATSAPP_API_TOKEN=...
# PORT=3000

# rodar em dev
npm run dev
```

---

## Estrutura do repositório
```
agent-financeiro/
├── docs/                # Documentação técnica e operaciona
├── api/                 # Backend (Node.js/Express minimal)
│   └── src/             # Código fonte do backend
├── sql/                 # Scripts SQL (schema, inserts, views)
└── README.md
```

---

## Boas práticas e notas importantes
- **Nunca commit chaves** no repositório. Use arquivos `.env` e o secrets manager do Railway/Supabase.
- Habilite **Row-Level Security (RLS)** no Supabase para isolar dados por usuário.
- Use **queries parametrizadas** para evitar SQL injection — mesmo que grande parte das consultas venha do n8n.
- Monitore gastos de tokens da OpenAI e latência de requests (SLAs: parsing < 5s ideal).
- Tenha backup diário do banco (Supabase possui ferramentas nativas).

---

## Próximos passos imediatos
1. Preencher variáveis de ambiente no Railway / Supabase.  
2. Importar `sql/schema.sql` em seu projeto Supabase.  
3. Configurar webhook no provedor WhatsApp e apontar para um webhook do n8n.  
4. Criar workflows no n8n seguindo `docs/fluxos-n8n.md`.  
5. Rodar testes e convidar 5–10 beta testers.

---

Se quiser, posso gerar também um `docker-compose` para execução local de serviços (n8n + postgres) e scripts de deploy automatizados para Railway.