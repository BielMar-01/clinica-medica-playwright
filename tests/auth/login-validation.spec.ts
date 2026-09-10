import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

const adminEmail = process.env.ADMIN_EMAIL;

test.describe('Validações do formulário de login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.acessar();
    await expect(page).toHaveURL(/\/login\/?$/);
  });

  test('AUTH-004 - Login com e-mail vazio', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.preencherSenha('SenhaValidaParaTeste@123');
    await loginPage.clicarEmEntrar();

    await test.step('Validar que o e-mail é obrigatório', async () => {
      const emailAusente = await loginPage.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.valueMissing,
      );

      expect(emailAusente).toBe(true);
      await expect(loginPage.emailInput).toBeFocused();
      await expect(page).toHaveURL(/\/login\/?$/);
    });
  });

  test('AUTH-005 - Login com senha vazia', async ({ page }) => {
    if (!adminEmail) {
      throw new Error(
        'A variável ADMIN_EMAIL deve estar configurada no arquivo .env.',
      );
    }

    const loginPage = new LoginPage(page);

    await loginPage.preencherEmail(adminEmail);
    await loginPage.clicarEmEntrar();

    await test.step('Validar que a senha é obrigatória', async () => {
      const senhaAusente = await loginPage.passwordInput.evaluate(
        (input: HTMLInputElement) => input.validity.valueMissing,
      );

      expect(senhaAusente).toBe(true);
      await expect(loginPage.passwordInput).toBeFocused();
      await expect(page).toHaveURL(/\/login\/?$/);
    });
  });

  test('AUTH-006 - Login com e-mail e senha vazios', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clicarEmEntrar();

    await test.step('Validar os dois campos obrigatórios', async () => {
      const emailAusente = await loginPage.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.valueMissing,
      );

      const senhaAusente = await loginPage.passwordInput.evaluate(
        (input: HTMLInputElement) => input.validity.valueMissing,
      );

      expect(emailAusente).toBe(true);
      expect(senhaAusente).toBe(true);

      // O navegador direciona o foco ao primeiro campo inválido.
      await expect(loginPage.emailInput).toBeFocused();
      await expect(page).toHaveURL(/\/login\/?$/);
    });
  });

  test('AUTH-007 - Login com formato de e-mail inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.preencherEmail('email-invalido');
    await loginPage.preencherSenha('SenhaValidaParaTeste@123');
    await loginPage.clicarEmEntrar();

    await test.step('Validar o formato inválido do e-mail', async () => {
      const formatoInvalido = await loginPage.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.typeMismatch,
      );

      expect(formatoInvalido).toBe(true);
      await expect(loginPage.emailInput).toBeFocused();
      await expect(page).toHaveURL(/\/login\/?$/);
    });
  });
});