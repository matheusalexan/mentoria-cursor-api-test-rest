# Outros testes para contexto de login
_Exported on 7/23/2025 at 22:03:14 GMT-3 from Cursor (1.2.4)_

---

**User**

Para pasta de teste de login existe outros testes para esse contexto?

---

**Cursor**

Na pasta de testes (`mentoria-cursor-api-test-rest/test`), existe apenas o arquivo `login.test.js`. Portanto, todos os testes relacionados ao contexto de login estão centralizados nesse arquivo. Não há outros arquivos de teste para login nesse diretório. 

Se precisar de mais testes ou quiser expandir a cobertura, é possível criar novos arquivos ou adicionar mais casos dentro deste arquivo. Se quiser sugestões de novos testes para login, posso ajudar!

---

**User**

Quero verificar se existe outros testes para realizar na pasta  login.test.js

---

**Cursor**

No arquivo `login.test.js`, já existem os seguintes testes para o contexto de login:

1. **Login com credenciais corretas**: espera status 200.
2. **Login com senha inválida**: espera status 401.
3. **Bloqueio após 3 tentativas inválidas**: espera status 423.
4. **Recuperação de senha com usuário válido**: espera status 200.
5. **Recuperação de senha com usuário inválido**: espera status 404 e mensagem específica.

Se você deseja expandir a cobertura de testes para o login, aqui estão algumas sugestões de outros testes que podem ser relevantes:

### Sugestões de novos testes para login

1. **Login com campos obrigatórios ausentes**
   - Enviar requisição sem o campo `username` ou `password` e esperar erro (ex: 400 Bad Request).

2. **Login com tipos de dados inválidos**
   - Enviar `username` ou `password` com tipos diferentes do esperado (ex: número ao invés de string).

3. **Login com usuário inexistente**
   - Tentar logar com um usuário que não existe e esperar status 401 ou 404, dependendo da implementação.

4. **Login com campos em branco**
   - Enviar `username` e/ou `password` como string vazia e esperar erro.

5. **Verificar resposta do corpo**
   - Garantir que, em caso de sucesso, o corpo da resposta contenha um token ou mensagem esperada.
   - Em caso de erro, garantir que a mensagem de erro seja clara e específica.

6. **Testar limites de tamanho**
   - Enviar `username` ou `password` muito longos e verificar se há tratamento adequado.

7. **Login com caracteres especiais**
   - Testar campos com caracteres especiais para garantir que não há falhas de validação ou segurança.

Se quiser implementar algum desses testes, posso ajudar a escrever o código! Qual deles você gostaria de adicionar?

---

**User**

Incluir o teste da sugestão 3 na pasta login.test.js

---

**Cursor**

```javascript
// ... existing code ...
  it('deve retornar 401 para login com usuário inexistente', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'usuarioInexistente', password: 'senhaQualquer' });

    if (![401, 404].includes(response.status)) {
      throw new Error(`Esperado 401 ou 404, mas retornou ${response.status}`);
    }
  });
// ... existing code ...
```

Adicionei o teste para login com usuário inexistente no arquivo `login.test.js`. Esse teste envia um usuário que não existe e espera receber status 401 ou 404, cobrindo assim o cenário sugerido.

Se quiser rodar os testes ou incluir mais algum cenário, é só avisar!

