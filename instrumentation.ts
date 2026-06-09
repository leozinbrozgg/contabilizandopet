export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { default: pool } = await import("./lib/db");

    await pool.query(`
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
      CREATE INDEX IF NOT EXISTS idx_leads_criado_em
        ON leads_consultoria (criado_em DESC);

      ALTER TABLE leads_consultoria
        ADD COLUMN IF NOT EXISTS status       TEXT        NOT NULL DEFAULT 'Novo',
        ADD COLUMN IF NOT EXISTS origem       TEXT        NOT NULL DEFAULT 'site',
        ADD COLUMN IF NOT EXISTS atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW();

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

      CREATE TABLE IF NOT EXISTS crm_users (
        id          SERIAL PRIMARY KEY,
        email       TEXT UNIQUE NOT NULL,
        senha_hash  TEXT NOT NULL,
        criado_em   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Cria o usuário admin inicial se ainda não existir
    const adminEmail = process.env.CRM_ADMIN_EMAIL;
    const adminSenha = process.env.CRM_ADMIN_SENHA;
    if (adminEmail && adminSenha) {
      const { rows } = await pool.query(
        "SELECT id FROM crm_users WHERE email = $1",
        [adminEmail.toLowerCase()]
      );
      if (!rows.length) {
        const bcrypt = await import("bcryptjs");
        const hash = await bcrypt.hash(adminSenha, 12);
        await pool.query(
          "INSERT INTO crm_users (email, senha_hash) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [adminEmail.toLowerCase(), hash]
        );
        console.log(`[DB] Usuário admin criado: ${adminEmail}`);
      }
    }

    console.log("[DB] Schema CRM verificado/criado.");
  }
}
