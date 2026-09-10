# Documentação BDD — Clínica Médica

## Objetivo

Este documento descreve os comportamentos automatizados da Clínica Médica utilizando BDD — Behavior Driven Development.

Os cenários são escritos em linguagem de negócio para facilitar o entendimento entre QA, desenvolvimento, produto e demais pessoas envolvidas no projeto.

## Estrutura do BDD

Os cenários utilizam as seguintes palavras-chave:

- `Funcionalidade`: comportamento ou recurso que será validado;
- `Contexto`: condição comum aos cenários;
- `Cenário`: comportamento específico que será testado;
- `Dado`: situação inicial ou pré-condição;
- `Quando`: ação executada pelo usuário;
- `Então`: resultado esperado;
- `E`: complemento de uma etapa.

## Automação e BDD

Os cenários BDD são utilizados como documentação do comportamento esperado.

A implementação técnica é realizada com Playwright e TypeScript nos arquivos `.spec.ts`.

| Documentação | Automação |
|---|---|
| Cenário escrito em português | Teste implementado com Playwright |
| Dado | Preparação e navegação |
| Quando | Interação com a aplicação |
| Então | Validação com `expect` |
| ID do cenário | Identificação no nome do teste |

Exemplo:

```gherkin
Cenário: AUTH-001 - Login com credenciais válidas
```

```typescript
test('AUTH-001 - Login com credenciais válidas', async ({ page }) => {
  // Implementação do cenário
});
```

---

# Funcionalidade: Autenticação

Como usuário da Clínica Médica  
Quero autenticar-me no sistema  
Para acessar as funcionalidades permitidas ao meu perfil

## Contexto

```gherkin
Dado que o usuário acessou a página de login da Clínica Médica
```

## AUTH-001 — Login com credenciais válidas

**Prioridade:** Alta  
**Tipo:** Funcional positivo  
**Automação:** `tests/auth/login.spec.ts`

```gherkin
Cenário: AUTH-001 - Login com credenciais válidas
  Dado que o usuário está na página de login
  E possui credenciais válidas
  Quando informar o e-mail
  E informar a senha
  E clicar no botão de entrar
  Então deve ser redirecionado para o dashboard
```

### Validações automatizadas

- Página de login acessível;
- Campo de e-mail visível;
- Campo de senha visível;
- Botão de entrada visível;
- Redirecionamento para `/dashboard`.

---

## AUTH-002 — Login com senha inválida

**Prioridade:** Alta  
**Tipo:** Funcional negativo  
**Automação:** `tests/auth/login.spec.ts`

```gherkin
Cenário: AUTH-002 - Login com senha inválida
  Dado que o usuário está na página de login
  E possui um e-mail cadastrado
  Quando informar o e-mail cadastrado
  E informar uma senha inválida
  E clicar no botão de entrar
  Então o acesso deve ser recusado
  E o usuário deve permanecer na página de login
  E uma mensagem de erro deve ser apresentada
```

### Validações automatizadas

- Usuário permanece em `/login`;
- Dashboard não é acessado;
- Mensagem de erro visível.

---

## AUTH-003 — Login com usuário inexistente

**Prioridade:** Alta  
**Tipo:** Funcional negativo  
**Automação:** `tests/auth/login.spec.ts`

```gherkin
Cenário: AUTH-003 - Login com usuário inexistente
  Dado que o usuário está na página de login
  E informa um e-mail que não está cadastrado
  Quando informar uma senha
  E clicar no botão de entrar
  Então o acesso deve ser recusado
  E o usuário deve permanecer na página de login
  E uma mensagem de erro deve ser apresentada
```

### Validações automatizadas

- Usuário permanece em `/login`;
- Dashboard não é acessado;
- Mensagem de erro visível.

---

## Dados de teste

As credenciais válidas são obtidas por variáveis de ambiente:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

As senhas não são armazenadas na documentação nem nos arquivos de automação.

Para cenários negativos, devem ser utilizados dados fictícios que não representem usuários reais.

## Estratégia de independência

Cada teste deve:

- Começar em uma nova sessão do navegador;
- Preparar as próprias pré-condições;
- Não depender da execução de outro teste;
- Poder ser executado individualmente;
- Produzir um resultado consistente;
- Não compartilhar credenciais ou dados sensíveis no código.

## Rastreabilidade

Os mesmos IDs devem ser utilizados na documentação, no gerenciador de tarefas e na automação:

| ID | Documento BDD | Teste Playwright |
|---|---|---|
| AUTH-001 | Login válido | `AUTH-001 - Login com credenciais válidas` |
| AUTH-002 | Senha inválida | `AUTH-002 - Login com senha inválida` |
| AUTH-003 | Usuário inexistente | `AUTH-003 - Login com usuário inexistente` |

## Próximos cenários de autenticação

- AUTH-004 — Login com e-mail vazio;
- AUTH-005 — Login com senha vazia;
- AUTH-006 — Login com e-mail e senha vazios;
- AUTH-007 — Login com formato de e-mail inválido;
- AUTH-008 — Usuário autenticado é redirecionado ao dashboard;
- AUTH-009 — Logout encerra a sessão;
- AUTH-010 — Após logout, rota protegida não pode ser acessada;
- AUTH-011 — Atualizar o navegador mantém a sessão;
- AUTH-012 — Sessão expirada tenta utilizar o refresh token;
- AUTH-013 — Refresh token inválido força retorno ao login.