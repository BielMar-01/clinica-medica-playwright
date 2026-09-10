# Clínica Médica — Automação E2E com Playwright

Projeto de automação de testes End-to-End da aplicação Clínica Médica, utilizando Playwright e TypeScript.

## Aplicação testada

- Frontend: https://clinica-medica-galera-do-ti.vercel.app
- Ambiente: aplicação hospedada na Vercel
- Tipo de teste: E2E
- Navegador inicial: Chromium

## Tecnologias

- Node.js
- TypeScript
- Playwright Test
- dotenv
- GitHub Actions

## Cenários automatizados

Atualmente, o projeto possui seis cenários automatizados.

### Autenticação

| ID | Cenário | Situação |
|---|---|---|
| AUTH-001 | Login com credenciais válidas | Automatizado |
| AUTH-002 | Login com senha inválida | Automatizado |
| AUTH-003 | Login com usuário inexistente | Automatizado |

### Rotas protegidas

| ID | Cenário | Situação |
|---|---|---|
| ROUTE-001 | Usuário não autenticado tenta acessar o Dashboard | Automatizado |
| ROUTE-002 | Usuário não autenticado tenta acessar Pacientes | Automatizado |
| ROUTE-003 | Usuário não autenticado tenta acessar Especialidades | Automatizado |

## Estrutura do projeto

```text
clinica-medica-playwright/
├── .github/
│   └── workflows/
├── docs/
│   └── BDD.md
├── fixtures/
├── pages/
│   └── LoginPage.ts
├── tests/
│   ├── auth/
│   │   └── login.spec.ts
│   ├── patients/
│   ├── rbac/
│   └── specialties/
├── utils/
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## Pré-requisitos

Antes de executar o projeto, instale:

- Node.js
- npm
- Git
- VS Code, recomendado

Para verificar as instalações:

```bash
node --version
npm --version
git --version
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/BielMar-01/clinica-medica-playwright.git
```

Acesse a pasta:

```bash
cd clinica-medica-playwright
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

```bash
npx playwright install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
ADMIN_EMAIL=seu-email
ADMIN_PASSWORD=sua-senha
```

Utilize o `.env.example` como referência.

> O arquivo `.env` contém informações sensíveis e não deve ser enviado ao Git.

## Execução dos testes

Executar todos os testes:

```bash
npx playwright test
```

Executar os testes visualizando o navegador:

```bash
npx playwright test --headed
```

Executar somente os testes de autenticação:

```bash
npx playwright test tests/auth/login.spec.ts
```

Executar autenticação visualizando o navegador:

```bash
npx playwright test tests/auth/login.spec.ts --headed
```

Executar pela interface do Playwright:

```bash
npx playwright test --ui
```

## Relatório HTML

Após uma execução, abra o relatório com:

```bash
npx playwright show-report
```

O relatório apresenta:

- Testes aprovados;
- Testes reprovados;
- Tempo de execução;
- Etapas executadas;
- Erros encontrados;
- Evidências configuradas.

## Evidências de falha

O projeto está configurado para gerar:

- Captura de tela quando o teste falhar;
- Vídeo somente quando o teste falhar;
- Trace na primeira repetição do teste;
- Relatório HTML.

As evidências são armazenadas em:

```text
test-results/
playwright-report/
```

Esses diretórios não devem ser versionados.

## Estratégia de seletores

A automação prioriza seletores estáveis com `data-testid`:

```typescript
page.getByTestId('login-email-input');
page.getByTestId('login-password-input');
page.getByTestId('login-submit-button');
```

Seletores baseados em classes CSS devem ser evitados, pois mudanças visuais podem quebrar testes sem alterar o comportamento da aplicação.

## Page Objects

As interações de cada tela são centralizadas em Page Objects.

Exemplo:

```typescript
const loginPage = new LoginPage(page);

await loginPage.acessar();
await loginPage.entrar(email, senha);
```

Isso evita duplicação e facilita a manutenção dos testes.

## BDD

A documentação dos comportamentos e cenários em BDD está disponível em:

```text
docs/BDD.md
```

## Próximos módulos

A evolução inicial da automação seguirá esta ordem:

1. Autenticação;
2. Rotas protegidas;
3. Dashboard;
4. Pacientes;
5. Especialidades;
6. RBAC;
7. Cenários técnicos e resiliência.

## Segurança

- Não colocar senhas diretamente nos testes;
- Não versionar o arquivo `.env`;
- Utilizar Secrets no GitHub Actions;
- Não utilizar dados pessoais reais como massa de teste;
- Utilizar usuários e registros exclusivos para automação.