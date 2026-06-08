# Prompt Completo — Contabilizando Pet Digital
# Para uso no Claude Code (Next.js 14 + Supabase + Tailwind CSS)

---

## CONTEXTO DO PROJETO

Crie um sistema completo para a marca **Contabilizando Pet Digital**, uma contabilidade digital especializada no mercado pet.

Este projeto é baseado na estrutura da **4U Connect** (contabilidade digital para prestadores de serviço), adaptada e especializada para o mercado pet.

---

## STACK TÉCNICA

- **Framework:** Next.js 14 com App Router
- **Estilização:** Tailwind CSS
- **Banco de dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **Fonte:** Montserrat (Google Fonts)
- **Deploy:** Vercel

---

## IDENTIDADE VISUAL

### Cores
```js
// tailwind.config.js
colors: {
  brand: {
    blue: '#03295A',
    orange: '#FE7501',
    white: '#FFFFFF',
  }
}
```

### Tipografia
- Fonte principal: **Montserrat**
- Títulos e botões: **Montserrat SemiBold (600)**
- Corpo: **Montserrat Regular (400)**

### Direção visual
- Clean, profissional, moderno, confiável
- Fundo branco predominante
- Seções de contraste em azul escuro `#03295A`
- Destaques e CTAs em laranja `#FE7501`
- Cards com bordas arredondadas (`rounded-xl`)
- Ícones sutis de pata e elementos pet
- Sem aparência infantil ou excessiva

---

## REQUISITOS DE SEO E PERFORMANCE

### SEO técnico — implementar obrigatoriamente:
- HTML semântico com H1, H2, H3 corretos
- `metadata` do Next.js 14 (title, description, Open Graph)
- `sitemap.xml` via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts`
- Schema markup `ProfessionalService` via JSON-LD em `app/layout.tsx`
- URLs amigáveis
- Imagens com `alt` descritivo, formato WebP, lazy loading (`loading="lazy"`)
- Mobile first

### Palavras-chave — usar naturalmente no conteúdo:
- Contabilidade para petshop
- Contabilidade para clínica veterinária
- Contabilidade para banho e tosa
- Contabilidade digital para petshop
- Contador para petshop
- Abrir empresa para petshop
- Migrar MEI para ME petshop
- Planejamento tributário para petshop
- Contabilidade especializada no mercado pet

### Performance — evitar:
- Bibliotecas pesadas desnecessárias
- Animações exageradas
- Imagens grandes sem otimização
- Scripts desnecessários

---

## ROTAS DO PROJETO

```
/                     → Landing page pública
/login                → Login do CRM
/crm                  → Dashboard do CRM (protegido)
/crm/leads            → Lista de leads (protegido)
/crm/leads/[id]       → Detalhes do lead (protegido)
```

---

## ESTRUTURA DO SITE PÚBLICO — `/`

### HEADER

Header fixo no topo com fundo `#03295A`.

**Logo:** "Contabilizando Pet Digital" com ícone de pata laranja.

**Menu:**
- Início
- Serviços (âncora `#servicos`)
- Segmentos (âncora `#segmentos`)
- Planos (âncora `#planos`)
- Consultoria Grátis (âncora `#consultoria`)
- Entrar → `/login`

**Botão destaque:** `Solicitar Consultoria Grátis` (laranja) → âncora `#consultoria`

---

### HERO

**Título H1:**
> Contabilidade Digital para Negócios Pet

**Subtítulo:**
> Contabilidade especializada para petshops, clínicas veterinárias, banho e tosa e empresas do setor pet que querem praticidade, controle, conformidade fiscal e atendimento humanizado.

**Botões:**
- `Ver Planos` → âncora `#planos`
- `Ver Serviços` → âncora `#servicos`

**Visual:** Imagem ou ilustração profissional de petshop/clínica/gestão pet. Fundo azul escuro com destaque laranja.

---

### SEÇÃO: DIFERENCIAIS

**Tag:** Vantagens Exclusivas
**Título H2:** Nossos Diferenciais
**Subtítulo:** Tudo que você precisa para ter controle total do seu negócio pet com agilidade digital.

**Lista de diferenciais (cards com ícone):**
1. Rapidez no atendimento
2. Aplicativo de gestão empresarial
3. Emissão de notas fiscais
4. Orientação sobre impostos
5. Análise mensal do faturamento
6. Supervisão de certidões
7. Análise do pró-labore dos sócios
8. Suporte especializado no mercado pet
9. Otimização tributária
10. Conta PJ digital

---

### SEÇÃO: DORES

**Título H2:** Seu negócio pet enfrenta algum desses problemas?

**Cards de dores:**
- Você não sabe se está pagando imposto demais?
- Seu contador não entende a rotina do mercado pet?
- Sua empresa cresceu, mas a contabilidade ficou desorganizada?
- Você tem dificuldade para controlar faturamento, notas e documentos?
- Está pensando em sair do MEI?
- Quer abrir uma empresa pet com segurança?
- Precisa trocar de contador?
- Tem dúvidas sobre emissão de nota fiscal?
- Quer crescer sem correr riscos fiscais?

**Frase de encerramento:**
> Se você se identificou com algum desses pontos, a Consultoria Grátis pode ajudar a entender o melhor caminho para sua empresa.

**Botão:** `Quero uma Consultoria Grátis` → âncora `#consultoria`

---

### SEÇÃO: SEGMENTOS ATENDIDOS (id="segmentos")

**Título H2:** Atendemos diversos negócios do mercado pet
**Subtítulo:** Soluções contábeis pensadas para diferentes tipos de empresas do setor pet.

**Cards com ícone:**
- Petshops
- Banho e tosa
- Clínicas veterinárias
- Hospitais veterinários
- Casas de ração
- Hotéis e creches para pets
- Lojas de produtos pet
- Distribuidores pet

---

### SEÇÃO: JORNADA DO CLIENTE

**Tag:** Passo a Passo
**Título H2:** Como funciona nossa consultoria contábil
**Subtítulo:** Do sonho à realização: 4 etapas estratégicas para o seu sucesso.

**Etapa 1 — Diagnóstico inicial**
- Definição do modelo de negócio
- Consultoria inicial
- Entendemos sua empresa, situação atual, faturamento e principais dificuldades

**Etapa 2 — Documentação e Planejamento**
- Criação e análise de documentos
- Assinatura digital
- Envio para Junta Comercial
- Planejamos o melhor caminho: abertura, regularização, migração ou troca de contador

**Etapa 3 — Aprovação**
- Empresa aprovada
- CNPJ ativo
- Orientação e organização dos documentos necessários

**Etapa 4 — Empresa Pronta!**
- Conta digital
- Certificado digital
- Emissão de NF e boletos
- Gestão contábil digital contínua

---

### SEÇÃO: SERVIÇOS (id="servicos")

**Tag:** O QUE FAZEMOS
**Título H2:** Soluções contábeis para o seu negócio pet
**Subtítulo:** Da abertura da empresa ao planejamento tributário, cuidamos da parte contábil para você focar no crescimento do seu negócio.

**Cards de serviços:**

#### Abertura de empresa com planejamento estratégico
> Abra seu petshop, clínica veterinária, banho e tosa ou negócio pet com o enquadramento correto desde o início. Na Contabilizando Pet Digital, você define a melhor forma de tributação, escolhe a atividade ideal e tira todas as suas dúvidas com apoio especializado.

#### Trocar de contador
> Trocar de contador é mais simples do que você imagina. Oferecemos suporte completo na transição, incluindo levantamento de pendências, garantindo uma migração tranquila para uma contabilidade moderna, digital e especializada no mercado pet.

#### Contabilidade completa
> Cuidamos das obrigações contábeis, fiscais e trabalhistas da sua empresa para que ela se mantenha regularizada e segura. Gestão completa para que você foque no crescimento sustentável do seu negócio pet.

#### Migrar de MEI para ME
> Se seu negócio pet cresceu e está próximo de ultrapassar o limite do MEI, cuidamos de todo o processo de migração junto à Receita Federal, Junta Comercial e Prefeitura, do início ao fim, com planejamento e segurança.

#### Certificado digital
> Soluções completas em certificados digitais para todos os tipos de negócios pet. Emitimos com agilidade, garantindo segurança nas transações, autenticidade dos documentos e conformidade fiscal da empresa.

#### Planejamento tributário
> Analisamos sua empresa para identificar o melhor enquadramento tributário e buscar economia de impostos dentro da lei. Estratégias contínuas para você pagar menos e aumentar a lucratividade do seu negócio pet.

---

### SEÇÃO: PLATAFORMA DIGITAL

**Tag:** Tecnologia Móvel
**Título H2:** Controle sua empresa pet de forma digital

**Texto:**
> A Contabilizando Pet Digital oferece uma plataforma exclusiva onde o empreendedor do setor pet tem o controle da empresa na palma da mão, tornando a contabilidade mais fácil, mais rápida e mais eficiente.

**Benefícios (lista com ícones):**
- Acesso a documentos
- Solicitações online
- Atendimento digital
- Organização contábil
- Mais praticidade no dia a dia
- Controle da empresa na palma da mão

---

### SEÇÃO: PARCEIROS ESTRATÉGICOS

**Tag:** Ecossistema de Parcerias
**Título H2:** Parceiros Estratégicos
**Subtítulo:** Conectamos nossos clientes a parceiros estratégicos, oferecendo soluções completas que facilitam o dia a dia, otimizam resultados e aceleram o crescimento dos negócios pet.

**Parceiro 1 — SEBRAE**
- Descrição: Transforme sua ideia em realidade com apoio especializado e educação empreendedora de ponta.
- Benefício exclusivo: Clientes Contabilizando Pet Digital garantem 20% de desconto nos cursos da Faculdade Sebrae. Em pagamentos parcelados +5% e à vista +10%.

**Parceiro 2 — CORA**
- Descrição: Banco digital PJ completo, focado em simplificar a gestão financeira do seu negócio.
- Benefício exclusivo: Conta digital PJ sem taxas. Abra sua conta gratuitamente com integração à plataforma digital.

**Parceiro 3 — COMPANY HERO**
- Descrição: Soluções de endereço fiscal e escritórios virtuais para empresas modernas.
- Benefício exclusivo: Descontos exclusivos para escritórios virtuais. Sua empresa pet com endereço privilegiado.

> **Nota técnica:** Usar cards com imagem de fundo (overlay escuro), logo do parceiro e badge de benefício exclusivo. Arquivos de imagem: `sebrae.svg`, `faculdade-sebrae.jpg`, `cora.svg`, `cora.png`, `company.svg`, `company.jpeg` em `/public`.

---

### SEÇÃO: PLANOS (id="planos")

**Tag:** Planos & Preços
**Título H2:** Escolha o plano ideal para sua empresa pet
**Subtítulo:** Todos os planos incluem abertura de empresa com planejamento estratégico e acesso total à plataforma digital.

**Benefícios incluídos em TODOS os planos:**
1. Especialistas no mercado pet — Entendemos sua realidade e estruturamos seu negócio para crescer com segurança.
2. Plataforma digital com controle total da empresa — Acesso a informações, documentos e solicitações em um só lugar.
3. Empresa pronta para faturar com rapidez — Regularizamos tudo para você emitir notas e operar sem atrasos.
4. Certificado digital incluso e sem complicação.
5. Conta PJ digital integrada em até 24h.
6. Relatórios contábeis para tomada de decisão.
7. Gestão inteligente de documentos.
8. Atendimento ágil e multicanal (chat, e-mail e WhatsApp).
9. Planejamento tributário contínuo.
10. Abertura de empresa com planejamento estratégico.

---

#### Plano SMALL — R$ 259,00/mês
- Até 5 notas fiscais/mês
- Pró-labore até 2 sócios
- Faturamento até R$ 250 mil/ano
- Folha de pagamento à parte
- Todos os benefícios inclusos

**Botão:** `Solicitar análise`

---

#### Plano SMART — R$ 389,00/mês ⭐ DESTAQUE / RECOMENDADO
- Tudo do Plano SMALL
- Até 10 notas fiscais/mês
- Pró-labore até 3 sócios
- Relatórios contábeis trimestrais
- Entrega de CNDs
- Faturamento até R$ 720 mil/ano
- Folha de pagamento à parte

**Botão:** `Quero este plano`
**Visual:** Destacar com borda laranja e badge "Mais escolhido"

---

#### Plano PREMIUM — R$ 699,00/mês
- Tudo do Plano SMART
- Até 20 notas fiscais/mês
- Pró-labore até 4 sócios
- Relatórios contábeis mensais
- Pesquisa de situação fiscal
- Folha até 5 funcionários
- Faturamento até R$ 1,8 milhão/ano

**Botão:** `Falar com especialista`

---

### SEÇÃO: FORMULÁRIO CONSULTORIA GRÁTIS (id="consultoria")

**Título H2:** Receba uma Consultoria Grátis para o seu Negócio Pet
**Subtítulo:** Preencha o formulário e nossa equipe vai analisar sua situação para entender como sua empresa pode ter mais organização, segurança fiscal e economia tributária dentro da lei.

**Campos do formulário:**

| Campo | Tipo | Obrigatório | Opções |
|---|---|---|---|
| Nome | texto | sim | — |
| WhatsApp | telefone | sim | máscara: (00) 00000-0000 |
| Tipo de negócio pet | select | sim | Petshop / Banho e tosa / Clínica veterinária / Hospital veterinário / Casa de ração / Hotel\|creche pet / Loja de produtos pet / Distribuidor pet / Outro |
| Situação atual | select | sim | Quero abrir uma empresa / Sou MEI / Já tenho empresa aberta / Quero trocar de contador / Estou com dúvidas fiscais |
| Faturamento médio mensal | select | sim | Até R$ 10 mil / De R$ 10 mil a R$ 30 mil / De R$ 30 mil a R$ 60 mil / Acima de R$ 60 mil / Prefiro não informar |
| Emite nota fiscal? | select | sim | Sim / Não / Às vezes / Tenho dúvidas sobre isso |
| Principal necessidade | select | sim | Reduzir impostos / Regularizar empresa / Sair do MEI / Abrir empresa / Trocar de contador / Organizar financeiro\|contábil / Entender se estou pagando imposto demais |
| Mensagem adicional | textarea | não | — |

**Botão:** `Solicitar Consultoria Grátis` (laranja, largura total)

**Após envio:**
1. Validar campos obrigatórios
2. Salvar lead no Supabase com status `Novo` e origem `Site - Consultoria Grátis Pet`
3. Exibir mensagem: *"Solicitação enviada com sucesso! Nossa equipe vai analisar suas informações e entrar em contato pelo WhatsApp."*
4. Lead aparece automaticamente no CRM

---

### SEÇÃO: CTA FINAL

**Título H2:** Agilidade Digital para sua Empresa Pet

**Texto:**
> Abandone a burocracia e tenha o controle total do seu negócio pet na palma da mão. A Contabilizando Pet Digital une tecnologia e consultoria especializada para acelerar seus resultados.

**Botões:**
- `Falar com Especialista` → `https://wa.me/5511930238204`
- `Solicitar Consultoria Grátis` → âncora `#consultoria`

---

### FOOTER

- Logo Contabilizando Pet Digital
- Texto: *Contabilidade especializada no mercado pet.*
- Links rápidos: Serviços, Planos, Consultoria Grátis
- WhatsApp: `https://wa.me/5511930238204`
- Direitos autorais: `© 2025 Contabilizando Pet Digital. Todos os direitos reservados.`

---

## NOTIFICAÇÃO INTERNA — WHATSAPP (estrutura para webhook)

Deixar estrutura preparada para integração futura via n8n, Evolution API ou webhook.

**Mensagem modelo:**
```
🐾 *Novo lead - Consultoria Grátis Pet*

Nome: {nome}
WhatsApp: {whatsapp}
Tipo de negócio: {tipo_negocio}
Situação: {situacao_empresa}
Faturamento: {faturamento_mensal}
Emite nota fiscal: {emite_nota}
Necessidade: {principal_necessidade}
Mensagem: {mensagem}
```

Criar variável de ambiente `WEBHOOK_WHATSAPP_URL` em `.env.local`. No MVP, logar no console. Em produção, fazer POST para a URL do webhook.

---

## BANCO DE DADOS — SUPABASE

### Tabela: `leads_consultoria_pet`

```sql
create table leads_consultoria_pet (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  whatsapp text not null,
  tipo_negocio text not null,
  situacao_empresa text not null,
  faturamento_mensal text not null,
  emite_nota text not null,
  principal_necessidade text not null,
  mensagem text,
  status text default 'Novo',
  origem text default 'Site - Consultoria Grátis Pet',
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);
```

### Tabela: `historico_lead`

```sql
create table historico_lead (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references leads_consultoria_pet(id) on delete cascade,
  usuario_id uuid references auth.users(id),
  observacao text,
  status_anterior text,
  status_novo text,
  criado_em timestamptz default now()
);
```

### RLS (Row Level Security)

```sql
-- leads_consultoria_pet: inserção pública, leitura apenas autenticados
alter table leads_consultoria_pet enable row level security;

create policy "Inserção pública de leads"
  on leads_consultoria_pet for insert
  with check (true);

create policy "Leitura apenas autenticada"
  on leads_consultoria_pet for select
  using (auth.role() = 'authenticated');

create policy "Atualização apenas autenticada"
  on leads_consultoria_pet for update
  using (auth.role() = 'authenticated');

-- historico_lead: apenas autenticados
alter table historico_lead enable row level security;

create policy "Histórico apenas autenticado"
  on historico_lead for all
  using (auth.role() = 'authenticated');
```

---

## CRM INTERNO

### Tela de Login — `/login`

- Campos: E-mail e Senha
- Botão: `Entrar`
- Usar Supabase Auth (`signInWithPassword`)
- Após login: redirecionar para `/crm`
- Usuário não autenticado em `/crm*`: redirecionar para `/login`
- Visual seguindo identidade da marca

---

### Dashboard — `/crm`

Cards de resumo:
- Total de leads
- Novos leads
- Em atendimento
- Aguardando resposta
- Reuniões agendadas
- Propostas enviadas
- Convertidos
- Perdidos

Layout:
- Menu lateral esquerdo (Dashboard / Leads / Sair)
- Cards com borda arredondada
- Fundo claro
- Títulos em `#03295A`, destaques em `#FE7501`

---

### Lista de Leads — `/crm/leads`

**Tabela com colunas:**
- Nome
- WhatsApp
- Tipo de negócio
- Situação da empresa
- Faturamento médio
- Principal necessidade
- Status (badge colorido)
- Data de cadastro
- Ações: `Visualizar` | `WhatsApp`

**Filtros:**
- Status
- Tipo de negócio
- Situação da empresa
- Principal necessidade

**Busca:** por Nome ou WhatsApp

---

### Detalhes do Lead — `/crm/leads/[id]`

**Exibir todos os campos:**
- Nome, WhatsApp, Tipo de negócio, Situação, Faturamento, Emite NF, Necessidade, Mensagem, Status, Origem, Criado em, Atualizado em

**Ações:**
- Alterar status (dropdown com os 7 status)
- Adicionar observação interna (textarea + botão Salvar)
- Histórico de observações e mudanças de status
- Botão `Abrir no WhatsApp` → `https://wa.me/55{whatsapp}` (nova aba)

---

### Status dos Leads

```
Novo | Em atendimento | Aguardando resposta | Reunião agendada | Proposta enviada | Convertido | Perdido
```

---

## REGRAS DE NEGÓCIO

1. Todo lead entra com status `Novo`
2. Todo lead tem origem preenchida automaticamente
3. Apenas usuários autenticados acessam o CRM
4. Toda alteração de status atualiza `atualizado_em` e registra em `historico_lead`
5. Observações internas são salvas no histórico do lead
6. Botão WhatsApp abre conversa em nova aba

---

## VARIÁVEIS DE AMBIENTE

Criar arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
WEBHOOK_WHATSAPP_URL=
```

---

## API ROUTES

### `POST /api/leads`

Recebe os dados do formulário, salva no Supabase e dispara webhook (se configurado).

```ts
// app/api/leads/route.ts
// Validar campos obrigatórios
// Inserir em leads_consultoria_pet
// Tentar POST para WEBHOOK_WHATSAPP_URL (se definida)
// Retornar { success: true } ou erro
```

---

## RESULTADO ESPERADO

Entregar um sistema funcional com:

- Site bonito, leve e otimizado para SEO no Next.js 14
- Comunicação direcionada ao mercado pet
- Seções: Header, Hero, Diferenciais, Dores, Segmentos, Jornada, Serviços, Plataforma Digital, Parceiros, Planos, Formulário Consultoria Grátis, CTA Final, Footer
- Formulário de Consultoria Grátis funcional
- Captação e salvamento de leads no Supabase
- CRM protegido por Supabase Auth
- Gestão completa dos leads (dashboard, lista, detalhes, histórico)
- Visual fiel à identidade da Contabilizando Pet Digital (`#03295A`, `#FE7501`, Montserrat)
- Código organizado, escalável e fácil de manter

**Diferencial principal:**
> Contabilidade especializada para negócios pet + Consultoria Grátis + captação de leads + CRM simples + site leve e otimizado para SEO.
