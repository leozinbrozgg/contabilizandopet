import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

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

  const extras: string[] = [];
  if (body.tipo_negocio_outro?.trim())
    extras.push(`Tipo (outro): ${body.tipo_negocio_outro.trim()}`);
  if (body.qtd_nfs_mes?.trim())
    extras.push(`NFs/mês: ${body.qtd_nfs_mes}`);
  const mensagemFinal =
    [body.mensagem?.trim(), ...extras].filter(Boolean).join("\n") || null;

  try {
    await pool.query(
      `INSERT INTO leads_consultoria (
        nome, whatsapp, tipo_negocio, situacao_empresa,
        faturamento_mensal, emite_nota, principal_necessidade, mensagem
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        body.nome.trim(),
        body.whatsapp.trim(),
        body.tipo_negocio,
        body.situacao_empresa,
        body.faturamento_mensal,
        body.emite_nota,
        body.principal_necessidade,
        mensagemFinal,
      ]
    );
  } catch (err) {
    console.error("Erro ao salvar lead:", err);
    return NextResponse.json(
      { error: "Erro ao salvar lead." },
      { status: 500 }
    );
  }

  const webhookUrl = process.env.WEBHOOK_WHATSAPP_URL;
  if (webhookUrl) {
    const msg =
      `🐾 *Novo lead - Consultoria Gratuita Pet*\n\n` +
      `Nome: ${body.nome}\n` +
      `WhatsApp: ${body.whatsapp}\n` +
      `Tipo de negócio: ${body.tipo_negocio}` +
      `${body.tipo_negocio_outro ? ` (${body.tipo_negocio_outro})` : ""}\n` +
      `Situação: ${body.situacao_empresa}\n` +
      `Faturamento: ${body.faturamento_mensal}\n` +
      `Emite nota fiscal: ${body.emite_nota}\n` +
      `NFs/mês: ${body.qtd_nfs_mes || "—"}\n` +
      `Necessidade: ${body.principal_necessidade}\n` +
      `Mensagem: ${body.mensagem || "—"}`;
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, ...body }),
      });
    } catch (e) {
      console.warn("Webhook falhou:", e);
    }
  }

  return NextResponse.json({ success: true });
}
