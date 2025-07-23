# Implementar testes para recuperar senha
_Exported on 7/22/2025 at 23:03:42 GMT-3 from Cursor (1.2.4)_

---

**User**

Objetivo:
Implemente testes para o endpoint de recuperar senha que preciso cobrir

Contexto:
Os cenários que eu preciso cobrir são de username valido, invalido

Regras:
Os nomes dos testes devem seguir o padrão a partir da suite "Recuperar Senha - Testes principais" no arquivo login.test.js

---

**Cursor**

Para cobrir os cenários do endpoint de recuperação de senha, você precisa testar:

1. Quando o username é válido (usuário existe): deve retornar 200 e mensagem de sucesso.
2. Quando o username é inválido (usuário não existe): deve retornar 404 e mensagem de erro.

Vou adicionar esses testes na suite "Recuperar Senha - Testes principais" no arquivo `test/login.test.js`, seguindo o padrão dos testes já existentes.

Aguarde, vou implementar os testes agora.

```javascript
// ... existing code ...
describe('Recuperar Senha - Testes principais', () => {
  it('deve retornar 200 para username válido', async () => {
    const response = await request(app)
      .post('/recuperar-senha')
      .send({ username: loginData.validUser.username });

    if (response.status !== 200) {
      throw new Error(`Esperado 200, mas retornou ${response.status}`);
    }
  });

  it('deve retornar 404 para username inválido', async () => {
    const response = await request(app)
      .post('/recuperar-senha')
      .send({ username: 'usuarioInexistente' });

    if (response.status !== 404) {
      throw new Error(`Esperado 404, mas retornou ${response.status}`);
    }
  });
});
// ... existing code ...
```

Os testes para o endpoint de recuperação de senha foram implementados no arquivo `test/login.test.js` na suite "Recuperar Senha - Testes principais", cobrindo os cenários de username válido (esperado 200) e username inválido (esperado 404), conforme solicitado.

Se quiser rodar os testes, basta executar:
```bash
npm test
```

Se precisar de mais algum cenário ou ajuste, é só avisar!

```shellscript
npm test
```

---

**User**

Faça o ajuste da mensagem de erro para o cenario de usuário não encontrato de acordo com o retorno do endpoint no arquivo app.js

---

**Cursor**

```javascript
// ... existing code ...
  it('deve retornar 404 para username inválido', async () => {
    const response = await request(app)
      .post('/recuperar-senha')
      .send({ username: 'usuarioInexistente' });

    if (response.status !== 404) {
      throw new Error(`Esperado 404, mas retornou ${response.status}`);
    }
    if (response.body.message !== 'Usuário não encontrado.') {
      throw new Error(`Mensagem inesperada: ${response.body.message}`);
    }
  });
// ... existing code ...
```

O teste para o cenário de usuário não encontrado foi ajustado: agora ele também verifica se a mensagem de erro retornada pelo endpoint é exatamente "Usuário não encontrado.", conforme implementado no arquivo `app.js`.

Se precisar de mais algum ajuste ou de outros cenários, é só avisar!

