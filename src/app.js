const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(express.json());

// Usuários simulados (em memória)
const users = [
  { username: 'user1', password: 'senha123' }
];

// Controle de tentativas e bloqueio (em memória)
const loginAttempts = {};
const MAX_ATTEMPTS = 3;

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  // Verifica se o usuário está bloqueado
  if (loginAttempts[username] && loginAttempts[username].blocked) {
    return res.status(423).json({ message: 'Usuário bloqueado por excesso de tentativas. Recupere sua senha.' });
  }

  if (user && user.password === password) {
    // Login bem-sucedido: zera tentativas
    loginAttempts[username] = { count: 0, blocked: false };
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  }

  // Login inválido: incrementa tentativas
  if (!loginAttempts[username]) {
    loginAttempts[username] = { count: 0, blocked: false };
  }
  loginAttempts[username].count += 1;

  if (loginAttempts[username].count >= MAX_ATTEMPTS) {
    loginAttempts[username].blocked = true;
    return res.status(423).json({ message: 'Usuário bloqueado por excesso de tentativas. Recupere sua senha.' });
  }

  return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
});

app.post('/recuperar-senha', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  // Desbloqueia e zera tentativas
  loginAttempts[username] = { count: 0, blocked: false };
  // Simula envio de nova senha
  return res.status(200).json({ message: 'Recuperação de senha realizada. Usuário desbloqueado.' });
});

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mentoria Cursor API Test REST',
    version: '1.0.0',
    description: 'API REST com autenticação básica, bloqueio e recuperação de senha.'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Servidor local' }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/app.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 *       423:
 *         description: Usuário bloqueado por excesso de tentativas
 */

/**
 * @swagger
 * /recuperar-senha:
 *   post:
 *     summary: Recupera a senha e desbloqueia o usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recuperação de senha realizada
 *       404:
 *         description: Usuário não encontrado
 */

module.exports = app; 