# mentoria-cursor-api-test-rest

API REST em JavaScript com autenticação básica, desenvolvida para fins de mentoria.

## Visão Geral
Este projeto simula um fluxo completo de autenticação, incluindo:
- Login com sucesso
- Login inválido
- Bloqueio de senha após três tentativas
- Recuperação de senha

Cada funcionalidade foi implementada em uma branch separada, seguindo boas práticas de versionamento e controle de mudanças.

## Como Funciona o Fluxo de Versionamento
1. **Branch para cada funcionalidade:**
   - Exemplo: `feat/login-invalido`, `feat/bloqueio-tres-tentativas`, etc.
2. **Implementação e commit:**
   - Cada funcionalidade é desenvolvida e comitada separadamente.
3. **Merge na main:**
   - Após finalização, a branch é mesclada na `main` e enviada ao repositório remoto.
4. **Atualização local:**
   - Sempre mantenha sua `main` atualizada com `git pull origin main`.

## Instalação
```bash
npm install
```

## Execução
```bash
npm run dev
```
Acesse a API em `http://localhost:3000`.

## Endpoints e Exemplos de Uso

### 1. Login
`POST /login`
```json
{
  "username": "user1",
  "password": "senha123"
}
```
- **200 OK**: Login realizado com sucesso.
- **401 Unauthorized**: Usuário ou senha inválidos.
- **423 Locked**: Usuário bloqueado após 3 tentativas inválidas.

### 2. Recuperação de Senha
`POST /recuperar-senha`
```json
{
  "username": "user1"
}
```
- **200 OK**: Usuário desbloqueado e tentativas zeradas.
- **404 Not Found**: Usuário não encontrado.

## Regras de Negócio Implementadas
- **Login com sucesso:**
  - Usuário e senha corretos retornam sucesso e zeram tentativas.
- **Login inválido:**
  - Usuário ou senha incorretos incrementam o contador de tentativas.
- **Bloqueio após 3 tentativas:**
  - Após 3 tentativas inválidas, o usuário é bloqueado e não pode mais tentar até recuperar a senha.
- **Recuperação de senha:**
  - Desbloqueia o usuário e zera o contador de tentativas.

## Estrutura do Projeto
- `src/` - Código fonte da API
  - `app.js` - Lógica dos endpoints e autenticação
  - `server.js` - Inicialização do servidor
- `test/` - Testes automatizados (estrutura pronta para expansão)

## Como contribuir
1. Crie uma branch a partir da `main` para cada nova funcionalidade ou correção.
2. Faça commits claros e objetivos.
3. Abra um Pull Request para revisão e merge.

## Licença
ISC 

## Testes Automatizados e Relatório HTML

Os testes automatizados podem ser executados com:
```bash
npm test
```

Após a execução, um relatório detalhado em HTML será gerado na pasta `reports/` (arquivo `index.html`).

Para visualizar o relatório, basta abrir o arquivo `reports/index.html` no seu navegador. O relatório mostra todos os testes que passaram ou falharam, facilitando a análise do funcionamento da API. 