import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const camposObrigatorios = [
  "nome",
  "whatsapp",
  "tipo_negocio",
  "situacao_empresa",
  "faturamento_mensal",
  "emite_nota",
  "principal_necessidade",
];

export async function POST(request: NextRequest) {
  const body = await request.json();

  for (const campo of camposObrigatorios) {
    if (!body[campo]?.trim()) {
      return NextResponse.json(
        { error: `Campo obrigatório ausente: ${campo}` },
        { status: 400 }
      );
    }
  }

  const { error } = await supabase.rpc("insert_lead_cpd", {
    p_nome: body.nome.trim(),
    p_whatsapp: body.whatsapp.trim(),
    p_tipo_negocio: body.tipo_negocio,
    p_situacao_empresa: body.situacao_empresa,
    p_faturamento_mensal: body.faturamento_mensal,
    p_emite_nota: body.emite_nota,
    p_principal_necessidade: body.principal_necessidade,
    p_mensagem: body.mensagem?.trim() || null,
  });

  if (error) {
    console.error("Erro ao salvar lead:", error);
    return NextResponse.json({ error: error.message ?? "Erro ao salvar lead." }, { status: 500 });
  }

  const webhookUrl = process.env.WEBHOOK_WHATSAPP_URL;
  if (webhookUrl) {
    const mensagemWebhook = `🐾 *Novo lead - Consultoria Grátis Pet*\n\nNome: ${body.nome}\nWhatsApp: ${body.whatsapp}\nTipo de negócio: ${body.tipo_negocio}\nSituação: ${body.situacao_empresa}\nFaturamento: ${body.faturamento_mensal}\nEmite nota fiscal: ${body.emite_nota}\nNecessidade: ${body.principal_necessidade}\nMensagem: ${body.mensagem || "—"}`;
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: mensagemWebhook, ...body }),
      });
    } catch (e) {
      console.warn("Webhook falhou:", e);
    }
  }

  return NextResponse.json({ success: true });
}
