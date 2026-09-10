import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

test.describe('Autenticação', () => {
  test('AUTH-001 - Login com credenciais válidas', async ({ page }) => {
    if (!adminEmail || !adminPassword) {
      throw new Error(
        'As variáveis ADMIN_EMAIL e ADMIN_PASSWORD devem estar configuradas no arquivo .env.',
      );
    }

    const loginPage = new LoginPage(page);

    await test.step('Acessar a página de login', async () => {
      await loginPage.acessar();

      await expect(page).toHaveURL(/\/login\/?$/);
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
    });

    await test.step('Informar credenciais válidas', async () => {
      await loginPage.entrar(adminEmail, adminPassword);
    });

    await test.step('Validar o redirecionamento para o dashboard', async () => {
      await expect(page).toHaveURL(/\/dashboard\/?$/);
    });
  });
});