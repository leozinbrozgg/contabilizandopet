-- Setup completo do CRM — executar no terminal do PostgreSQL no EasyPanel

-- 1. Colunas extras em leads_consultoria
ALTER TABLE leads_consultoria
  ADD COLUMN IF NOT EXISTS status        TEXT        NOT NULL DEFAULT 'Novo',
  ADD COLUMN IF NOT EXISTS origem        TEXT        NOT NULL DEFAULT 'site',
  ADD COLUMN IF NOT EXISTS atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 2. Histórico de leads
CREATE TABLE IF NOT EXISTS leads_historico (
  id              SERIAL PRIMARY KEY,
  lead_id         INTEGER NOT NULL REFERENCES leads_consultoria(id) ON DELETE CASCADE,
  observacao      TEXT,
  status_anterior TEXT,
  status_novo     TEXT,
  criado_em       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_historico_lead_id
  ON leads_historico (lead_id, criado_em DESC);

-- 3. Usuários do CRM
CREATE TABLE IF NOT EXISTS crm_users (
  id         SERIAL PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  criado_em  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Usuário admin inicial
-- Email: contato@contabilizandodigital.com.br  |  Senha: ContPet@2026!
INSERT INTO crm_users (email, senha_hash)
VALUES (
  'contato@contabilizandodigital.com.br',
  '$2b$12$xHIkt1whokytx9z9TjK7fOW0FHmaoEj3cS4QixV0bjH1OpNuMgLpa'
)
ON CONFLICT (email) DO NOTHING;

SELECT 'Setup CRM concluído!' AS status;
