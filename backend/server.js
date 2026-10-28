// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa a nossa conexão do arquivo db.js

const app = express();

// Middlewares para o servidor entender JSON e aceitar requisições do site
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// ROTAS DA API (O que o servidor faz quando chamado)
// ----------------------------------------------------

// 1. Rota para Listar todos os Pratos cadastrados no MySQL
app.get('/api/pratos', (req, res) => {
  const query = 'SELECT * FROM pratos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar pratos no banco.' });
    }
    res.json(results); // Devolve os pratos em formato JSON
  });
});

// 2. Rota para Listar todos os Ingredientes e o estoque atual
app.get('/api/ingredientes', (req, res) => {
  const query = 'SELECT * FROM ingredientes';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar ingredientes.' });
    }
    res.json(results);
  });
});

// 3. Rota para Listar os Cozinheiros
app.get('/api/cozinheiros', (req, res) => {
  const query = 'SELECT * FROM cozinheiros';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar cozinheiros.' });
    }
    res.json(results);
  });
});

// 4. Rota para Cadastrar um Novo Prato (Recebe dados do site e salva no MySQL)
app.post('/api/pratos', (req, res) => {
  const { nome, tipo, tempo_preparo } = req.body;
  const query = 'INSERT INTO pratos (nome, tipo, tempo_preparo) VALUES (?, ?, ?)';
  
  db.query(query, [nome, tipo, tempo_preparo], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao cadastrar novo prato.' });
    }
    res.status(201).json({ mensagem: 'Prato cadastrado com sucesso!', id: result.insertId });
  });
});

// ----------------------------------------------------
// LIGAR O SERVIDOR NA PORTA 3000
// ----------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});