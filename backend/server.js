const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== ROTAS DE PRATOS ====================
// Colunas reais: id, nome, tipo, tempo_preparo
app.get('/api/pratos', (req, res) => {
  db.query('SELECT * FROM pratos ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Erro GET pratos:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
});

app.post('/api/pratos', (req, res) => {
  const { nome, tipo, tempo_preparo } = req.body;
  const tempo = tempo_preparo ? parseInt(tempo_preparo) : null;
  const query = 'INSERT INTO pratos (nome, tipo, tempo_preparo) VALUES (?, ?, ?)';
  
  db.query(query, [nome, tipo || 'Geral', tempo], (err, result) => {
    if (err) {
      console.error('Erro POST pratos:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.status(201).json({ mensagem: 'Prato cadastrado!', id: result.insertId });
  });
});

app.put('/api/pratos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, tipo, tempo_preparo } = req.body;
  const tempo = tempo_preparo ? parseInt(tempo_preparo) : null;
  const query = 'UPDATE pratos SET nome = ?, tipo = ?, tempo_preparo = ? WHERE id = ?';

  db.query(query, [nome, tipo || 'Geral', tempo, id], (err) => {
    if (err) {
      console.error('Erro PUT pratos:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: 'Prato atualizado!' });
  });
});

app.delete('/api/pratos/:id', (req, res) => {
  db.query('DELETE FROM pratos WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Erro DELETE pratos:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: 'Prato excluído!' });
  });
});

// ==================== ROTAS DE INGREDIENTES ====================
// Colunas reais: id, nome, unidade, estoque_atual
app.get('/api/ingredientes', (req, res) => {
  db.query('SELECT * FROM ingredientes ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Erro GET ingredientes:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
});

app.post('/api/ingredientes', (req, res) => {
  const { nome, estoque_atual, unidade } = req.body;
  const qtd = parseInt(estoque_atual) || 0;
  const query = 'INSERT INTO ingredientes (nome, unidade, estoque_atual) VALUES (?, ?, ?)';

  db.query(query, [nome, unidade || 'un', qtd], (err, result) => {
    if (err) {
      console.error('Erro POST ingredientes:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.status(201).json({ mensagem: 'Ingrediente cadastrado!', id: result.insertId });
  });
});

app.put('/api/ingredientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, estoque_atual, unidade } = req.body;
  const qtd = parseInt(estoque_atual) || 0;
  const query = 'UPDATE ingredientes SET nome = ?, unidade = ?, estoque_atual = ? WHERE id = ?';

  db.query(query, [nome, unidade || 'un', qtd, id], (err) => {
    if (err) {
      console.error('Erro PUT ingredientes:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: 'Ingrediente atualizado!' });
  });
});

app.delete('/api/ingredientes/:id', (req, res) => {
  db.query('DELETE FROM ingredientes WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Erro DELETE ingredientes:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: 'Ingrediente excluído!' });
  });
});

// ==================== ROTAS DE COZINHEIROS ====================
// Colunas reais: id, nome, nivel, especialidade
app.get('/api/cozinheiros', (req, res) => {
  db.query('SELECT * FROM cozinheiros ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Erro GET cozinheiros:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
});

app.post('/api/cozinheiros', (req, res) => {
  const { nome, nivel, especialidade } = req.body;
  const query = 'INSERT INTO cozinheiros (nome, nivel, especialidade) VALUES (?, ?, ?)';

  db.query(query, [nome, nivel || null, especialidade || null], (err, result) => {
    if (err) {
      console.error('Erro POST cozinheiros:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.status(201).json({ mensagem: 'Cozinheiro cadastrado!', id: result.insertId });
  });
});

app.put('/api/cozinheiros/:id', (req, res) => {
  const { id } = req.params;
  const { nome, nivel, especialidade } = req.body;
  const query = 'UPDATE cozinheiros SET nome = ?, nivel = ?, especialidade = ? WHERE id = ?';

  db.query(query, [nome, nivel || null, especialidade || null, id], (err) => {
    if (err) {
      console.error('Erro PUT cozinheiros:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: 'Cozinheiro atualizado!' });
  });
});

app.delete('/api/cozinheiros/:id', (req, res) => {
  db.query('DELETE FROM cozinheiros WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Erro DELETE cozinheiros:', err.message);
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: 'Cozinheiro excluído!' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});