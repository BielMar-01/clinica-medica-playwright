import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

test.describe('Autenticação', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.acessar();
    await expect(page).toHaveURL(/\/login\/?$/);
  });

  test('AUTH-001 - Login com credenciais válidas', async ({ page }) => {
    if (!adminEmail || !adminPassword) {
      throw new Error(
        'As variáveis ADMIN_EMAIL e ADMIN_PASSWORD devem estar configuradas no arquivo .env.',
      );
    }

    const loginPage = new LoginPage(page);

    await test.step('Validar a apresentação do formulário', async () => {
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
    });

    await test.step('Informar as credenciais válidas', async () => {
      await loginPage.entrar(adminEmail, adminPassword);
    });

    await test.step('Validar o acesso ao dashboard', async () => {
      await expect(page).toHaveURL(/\/dashboard\/?$/);
    });
  });

  test('AUTH-002 - Login com senha inválida', async ({ page }) => {
    if (!adminEmail) {
      throw new Error(
        'A variável ADMIN_EMAIL deve estar configurada no arquivo .env.',
      );
    }

    const loginPage = new LoginPage(page);

    await test.step('Informar uma senha inválida', async () => {
      await loginPage.entrar(adminEmail, 'SenhaIncorreta@123');
    });

    await test.step('Validar que o acesso foi recusado', async () => {
      await expect(page).toHaveURL(/\/login\/?$/);
      await expect(loginPage.errorAlert).toBeVisible();
    });
  });

  test('AUTH-003 - Login com usuário inexistente', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Informar um usuário inexistente', async () => {
      await loginPage.entrar(
        'usuario.inexistente@clinica.local',
        'SenhaIncorreta@123',
      );
    });

    await test.step('Validar que o acesso foi recusado', async () => {
      await expect(page).toHaveURL(/\/login\/?$/);
      await expect(loginPage.errorAlert).toBeVisible();
    });
  });
});