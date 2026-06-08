-- ============================================
-- Contabilizando Pet Digital — Schema: cpd
-- Execute no SQL Editor do Supabase
-- ============================================

-- 1. Criar o schema
CREATE SCHEMA IF NOT EXISTS cpd;

-- 2. Garantir acesso ao schema para os roles do Supabase
GRANT USAGE ON SCHEMA cpd TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA cpd TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA cpd TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA cpd GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA cpd GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- 3. Tabela de leads
CREATE TABLE IF NOT EXISTS cpd.leads_consultoria_pet (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  whatsapp text NOT NULL,
  tipo_negocio text NOT NULL,
  situacao_empresa text NOT NULL,
  faturamento_mensal text NOT NULL,
  emite_nota text NOT NULL,
  principal_necessidade text NOT NULL,
  mensagem text,
  status text DEFAULT 'Novo',
  origem text DEFAULT 'Site - Consultoria Grátis Pet',
  criado_em timestamptz DEFAULT now(),
  atualizado_em timestamptz DEFAULT now()
);

-- 4. Tabela de histórico
CREATE TABLE IF NOT EXISTS cpd.historico_lead (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES cpd.leads_consultoria_pet(id) ON DELETE CASCADE,
  usuario_id uuid REFERENCES auth.users(id),
  observacao text,
  status_anterior text,
  status_novo text,
  criado_em timestamptz DEFAULT now()
);

-- 5. RLS — leads_consultoria_pet
ALTER TABLE cpd.leads_consultoria_pet ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inserção pública de leads"
  ON cpd.leads_consultoria_pet FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Leitura apenas autenticada"
  ON cpd.leads_consultoria_pet FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Atualização apenas autenticada"
  ON cpd.leads_consultoria_pet FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 6. RLS — historico_lead
ALTER TABLE cpd.historico_lead ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Histórico apenas autenticado"
  ON cpd.historico_lead FOR ALL
  USING (auth.role() = 'authenticated');

-- 7. Trigger para atualizar atualizado_em
CREATE OR REPLACE FUNCTION cpd.update_atualizado_em()
RETURNS trigger AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizado_em
  BEFORE UPDATE ON cpd.leads_consultoria_pet
  FOR EACH ROW EXECUTE FUNCTION cpd.update_atualizado_em();
