import { test, expect, Page } from "@playwright/test";

// ─── helpers ────────────────────────────────────────────────────────────────

async function scrollToForm(page: Page) {
  await page.goto("/");
  await page.locator("#consultoria").scrollIntoViewIfNeeded();
  await page.waitForSelector("form", { state: "visible" });
}

async function fillFormBase(page: Page) {
  await page.fill('input[name="nome"]', "João da Silva Teste");
  await page.fill('input[name="whatsapp"]', "11999998888");
  await page.selectOption('select[name="tipo_negocio"]', "Petshop");
  await page.selectOption('select[name="situacao_empresa"]', "Já tenho empresa aberta");
  await page.selectOption('select[name="faturamento_mensal"]', "De R$ 10 mil a R$ 30 mil");
  await page.selectOption('select[name="emite_nota"]', "Sim");
  await page.selectOption('select[name="principal_necessidade"]', "Reduzir impostos");
}

/** Intercepta POST /api/leads e devolve { success: true } sem chamar o Supabase */
async function mockApiSuccess(page: Page) {
  await page.route("/api/leads", (route) => {
    route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
  });
}

/** Intercepta POST /api/leads e devolve erro 500 */
async function mockApiError(page: Page) {
  await page.route("/api/leads", (route) => {
    route.fulfill({ status: 500, contentType: "application/json", body: '{"error":"Erro ao salvar lead."}' });
  });
}

// ─── testes ─────────────────────────────────────────────────────────────────

test.describe("Formulário de Consultoria Gratuita", () => {

  // 1. Renderização
  test("exibe o formulário ao acessar a seção #consultoria", async ({ page }) => {
    await scrollToForm(page);

    await expect(page.locator("text=Consultoria Gratuita").first()).toBeVisible();
    await expect(page.locator('input[name="nome"]')).toBeVisible();
    await expect(page.locator('input[name="whatsapp"]')).toBeVisible();
    await expect(page.locator('select[name="tipo_negocio"]')).toBeVisible();
    await expect(page.locator('select[name="situacao_empresa"]')).toBeVisible();
    await expect(page.locator('select[name="faturamento_mensal"]')).toBeVisible();
    await expect(page.locator('select[name="emite_nota"]')).toBeVisible();
    await expect(page.locator('select[name="qtd_nfs_mes"]')).toBeVisible();
    await expect(page.locator('select[name="principal_necessidade"]')).toBeVisible();
    await expect(page.locator('textarea[name="mensagem"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText("Solicitar Consultoria Gratuita");
  });

  // 2. Máscara de telefone
  test("aplica máscara no campo WhatsApp", async ({ page }) => {
    await scrollToForm(page);

    await page.fill('input[name="whatsapp"]', "11999998888");
    const valor = await page.inputValue('input[name="whatsapp"]');
    expect(valor).toBe("(11) 99999-8888");
  });

  // 3. Campo "Outro" condicional
  test('exibe campo extra quando "Outro" é selecionado em Tipo de negócio', async ({ page }) => {
    await scrollToForm(page);

    // Antes de selecionar "Outro", o campo extra não deve existir
    await expect(page.locator('input[name="tipo_negocio_outro"]')).toHaveCount(0);

    await page.selectOption('select[name="tipo_negocio"]', "Outro");

    // Agora deve aparecer
    await expect(page.locator('input[name="tipo_negocio_outro"]')).toBeVisible();

    // Ao trocar para outra opção, o campo some
    await page.selectOption('select[name="tipo_negocio"]', "Petshop");
    await expect(page.locator('input[name="tipo_negocio_outro"]')).toHaveCount(0);
  });

  // 4. Validação de campos obrigatórios (HTML5 native)
  test("não submete com campos obrigatórios vazios", async ({ page }) => {
    await scrollToForm(page);

    await page.click('button[type="submit"]');

    // Formulário não deve sumir (sem mensagem de sucesso)
    await expect(page.locator("text=Solicitação enviada!")).not.toBeVisible();
    // Ainda exibe o botão
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  // 5. Campo nome aceita texto livre
  test("aceita qualquer texto no campo nome", async ({ page }) => {
    await scrollToForm(page);
    await page.fill('input[name="nome"]', "Maria Petshop 123");
    const valor = await page.inputValue('input[name="nome"]');
    expect(valor).toBe("Maria Petshop 123");
  });

  // 6. Submissão com tipo de negócio "Outro" (mock API)
  test("preenche e submete o formulário com tipo de negócio Outro", async ({ page }) => {
    await mockApiSuccess(page);
    await scrollToForm(page);

    await page.fill('input[name="nome"]', "Ana Costa Teste");
    await page.fill('input[name="whatsapp"]', "11988887777");
    await page.selectOption('select[name="tipo_negocio"]', "Outro");
    await page.fill('input[name="tipo_negocio_outro"]', "Loja de aquários e peixes");
    await page.selectOption('select[name="situacao_empresa"]', "Quero abrir uma empresa");
    await page.selectOption('select[name="faturamento_mensal"]', "Até R$ 10 mil");
    await page.selectOption('select[name="emite_nota"]', "Não");
    await page.selectOption('select[name="qtd_nfs_mes"]', "Não emito");
    await page.selectOption('select[name="principal_necessidade"]', "Abrir empresa");
    await page.fill('textarea[name="mensagem"]', "Teste automatizado — tipo outro");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Solicitação enviada!")).toBeVisible({ timeout: 5_000 });
  });

  // 7. Submissão completa — cenário principal (mock API)
  test("preenche e submete o formulário completo com sucesso", async ({ page }) => {
    await mockApiSuccess(page);
    await scrollToForm(page);
    await fillFormBase(page);

    await page.selectOption('select[name="qtd_nfs_mes"]', "1 a 5");
    await page.fill('textarea[name="mensagem"]', "Teste automatizado — cenário principal");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Solicitação enviada!")).toBeVisible({ timeout: 5_000 });
    await expect(
      page.locator("text=Nossa equipe vai analisar suas informações")
    ).toBeVisible();
  });

  // 8. Após sucesso, formulário some e exibe confirmação (mock API)
  test("exibe tela de confirmação e esconde o formulário após envio", async ({ page }) => {
    await mockApiSuccess(page);
    await scrollToForm(page);
    await fillFormBase(page);

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Solicitação enviada!")).toBeVisible({ timeout: 5_000 });
    await expect(page.locator('button[type="submit"]')).not.toBeVisible();
    await expect(page.locator('input[name="nome"]')).not.toBeVisible();
  });

  // 9. Exibe mensagem de erro quando API retorna 500 (mock API)
  test("exibe mensagem de erro quando a API falha", async ({ page }) => {
    await mockApiError(page);
    await scrollToForm(page);
    await fillFormBase(page);

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Erro ao salvar lead.")).toBeVisible({ timeout: 5_000 });
    // Formulário permanece visível para o usuário tentar novamente
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  // 10. Payload enviado ao /api/leads contém os campos corretos
  test("envia os dados corretos para a API", async ({ page }) => {
    let bodyCapturado: Record<string, string> = {};

    await page.route("/api/leads", async (route) => {
      const request = route.request();
      bodyCapturado = await request.postDataJSON();
      route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
    });

    await scrollToForm(page);
    await page.fill('input[name="nome"]', "Carlos Teste");
    await page.fill('input[name="whatsapp"]', "11977776666");
    await page.selectOption('select[name="tipo_negocio"]', "Banho e tosa");
    await page.selectOption('select[name="situacao_empresa"]', "Sou MEI");
    await page.selectOption('select[name="faturamento_mensal"]', "Até R$ 10 mil");
    await page.selectOption('select[name="emite_nota"]', "Não");
    await page.selectOption('select[name="qtd_nfs_mes"]', "Não emito");
    await page.selectOption('select[name="principal_necessidade"]', "Sair do MEI");
    await page.fill('textarea[name="mensagem"]', "Quero sair do MEI");

    await page.click('button[type="submit"]');
    await expect(page.locator("text=Solicitação enviada!")).toBeVisible({ timeout: 5_000 });

    expect(bodyCapturado.nome).toBe("Carlos Teste");
    expect(bodyCapturado.whatsapp).toBe("(11) 97777-6666");
    expect(bodyCapturado.tipo_negocio).toBe("Banho e tosa");
    expect(bodyCapturado.situacao_empresa).toBe("Sou MEI");
    expect(bodyCapturado.faturamento_mensal).toBe("Até R$ 10 mil");
    expect(bodyCapturado.emite_nota).toBe("Não");
    expect(bodyCapturado.qtd_nfs_mes).toBe("Não emito");
    expect(bodyCapturado.principal_necessidade).toBe("Sair do MEI");
    expect(bodyCapturado.mensagem).toBe("Quero sair do MEI");
  });

});
