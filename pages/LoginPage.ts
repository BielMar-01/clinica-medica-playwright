import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-button');
  }

  async acessar(): Promise<void> {
    await this.page.goto('/login');
  }

  async preencherEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async preencherSenha(senha: string): Promise<void> {
    await this.passwordInput.fill(senha);
  }

  async entrar(email: string, senha: string): Promise<void> {
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.submitButton.click();
  }
}