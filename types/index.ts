export type LeadStatus =
  | "Novo"
  | "Em atendimento"
  | "Aguardando resposta"
  | "Reunião agendada"
  | "Proposta enviada"
  | "Convertido"
  | "Perdido";

export interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  tipo_negocio: string;
  situacao_empresa: string;
  faturamento_mensal: string;
  emite_nota: string;
  principal_necessidade: string;
  mensagem?: string;
  status: LeadStatus;
  origem: string;
  criado_em: string;
  atualizado_em: string;
}

export interface HistoricoLead {
  id: string;
  lead_id: string;
  usuario_id?: string;
  observacao?: string;
  status_anterior?: string;
  status_novo?: string;
  criado_em: string;
}

export interface FormularioConsultoriaData {
  nome: string;
  whatsapp: string;
  tipo_negocio: string;
  situacao_empresa: string;
  faturamento_mensal: string;
  emite_nota: string;
  principal_necessidade: string;
  mensagem?: string;
}
