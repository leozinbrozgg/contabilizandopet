-- Tabela de leads do formulário de Consultoria Gratuita
-- Executar no banco "postgres" da VPS

CREATE TABLE IF NOT EXISTS leads_consultoria (
  id                    SERIAL PRIMARY KEY,
  nome                  TEXT NOT NULL,
  whatsapp              TEXT NOT NULL,
  tipo_negocio          TEXT NOT NULL,
  situacao_empresa      TEXT NOT NULL,
  faturamento_mensal    TEXT NOT NULL,
  emite_nota            TEXT NOT NULL,
  principal_necessidade TEXT NOT NULL,
  mensagem              TEXT,
  criado_em             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para facilitar ordenação por data
CREATE INDEX IF NOT EXISTS idx_leads_criado_em ON leads_consultoria (criado_em DESC);

-- Confirma criação
SELECT 'Tabela leads_consultoria criada com sucesso!' AS status;
