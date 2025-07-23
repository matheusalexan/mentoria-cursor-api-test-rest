const request = require('supertest');
const app = require('../src/app');
const loginData = require('../fixtures/login.json');

describe('Login - Testes principais com fixture', () => {
  it('deve retornar 200 para login com credenciais corretas', async () => {
    const response = await request(app)
      .post('/login')
      .send(loginData.validUser);

    if (response.status !== 200) {
      throw new Error(`Esperado 200, mas retornou ${response.status}`);
    }
  });

  it('deve retornar 401 para login com senha inválida', async () => {
    const response = await request(app)
      .post('/login')
      .send(loginData.invalidUser);

    if (response.status !== 401) {
      throw new Error(`Esperado 401, mas retornou ${response.status}`);
    }
  });

  it('deve retornar 423 após 3 tentativas inválidas', async () =>{
    for (let i = 0; i < 3; i++) {
      await request(app).post('/login').send(loginData.invalidUser);
    }

    const response = await request(app).post('/login').send(loginData.invalidUser);

    if (response.status !==423) {
      throw new Error(`Esperado 423, mais retornou ${response.status}`);
    }

  })
});

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
    if (response.body.message !== 'Usuário não encontrado.') {
      throw new Error(`Mensagem inesperada: ${response.body.message}`);
    }
  });
});
