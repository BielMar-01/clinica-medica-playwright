import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

const protectedRoutes = [
  {
    id: 'ROUTE-001',
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: 'ROUTE-002',
    name: 'Pacientes',
    path: '/pacientes',
  },
  {
    id: 'ROUTE-003',
    name: 'Especialidades',
    path: '/especialidades',
  },
];

test.describe('Rotas protegidas', () => {
  for (const protectedRoute of protectedRoutes) {
    test(`${protectedRoute.id} - Usuário não autenticado tenta acessar ${protectedRoute.name}`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);

      await test.step(`Acessar diretamente ${protectedRoute.path}`, async () => {
        await page.goto(protectedRoute.path);
      });

      await test.step('Validar o redirecionamento para o login', async () => {
        await expect(page).toHaveURL(/\/login\/?(?:\?.*)?$/);

        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.submitButton).toBeVisible();
      });
    });
  }
});