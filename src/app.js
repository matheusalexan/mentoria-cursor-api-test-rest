const express = require('express');
const app = express();

app.use(express.json());

// Usuários simulados (em memória)
const users = [
  { username: 'user1', password: 'senha123' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  }
  // Caso de login inválido
  return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
});

module.exports = app; 