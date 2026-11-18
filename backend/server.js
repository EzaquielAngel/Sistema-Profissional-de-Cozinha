const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== ROTAS DE PRATOS ====================
app.get('/api/pratos', (req, res) => {
  db.query('SELECT * FROM pratos ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

app.post('/api/pratos', (req, res) => {
  const { nome, tipo, tempo_preparo } = req.body;
  const tempo = tempo_preparo ? parseInt(tempo_preparo) : null;
  db.query('INSERT INTO pratos (nome, tipo, tempo_preparo) VALUES (?, ?, ?)', 
    [nome, tipo || 'Geral', tempo], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ mensagem: 'Prato cadastrado!', id: result.insertId });
    });
});

app.put('/api/pratos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, tipo, tempo_preparo } = req.body;
  const tempo = tempo_preparo ? parseInt(tempo_preparo) : null;
  db.query('UPDATE pratos SET nome = ?, tipo = ?, tempo_preparo = ? WHERE id = ?', 
    [nome, tipo || 'Geral', tempo, id], (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Prato atualizado!' });
    });
});

app.delete('/api/pratos/:id', (req, res) => {
  db.query('DELETE FROM pratos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Prato excluído!' });
  });
});

// ==================== ROTAS DE INGREDIENTES ====================
app.get('/api/ingredientes', (req, res) => {
  db.query('SELECT * FROM ingredientes ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

app.post('/api/ingredientes', (req, res) => {
  const { nome, estoque_atual, unidade } = req.body;
  const qtd = parseInt(estoque_atual) || 0;
  db.query('INSERT INTO ingredientes (nome, unidade, estoque_atual) VALUES (?, ?, ?)', 
    [nome, unidade || 'un', qtd], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ mensagem: 'Ingrediente cadastrado!', id: result.insertId });
    });
});

app.put('/api/ingredientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, estoque_atual, unidade } = req.body;
  const qtd = parseInt(estoque_atual) || 0;
  db.query('UPDATE ingredientes SET nome = ?, unidade = ?, estoque_atual = ? WHERE id = ?', 
    [nome, unidade || 'un', qtd, id], (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Ingrediente atualizado!' });
    });
});

app.delete('/api/ingredientes/:id', (req, res) => {
  db.query('DELETE FROM ingredientes WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Ingrediente excluído!' });
  });
});

// ==================== ROTAS DE COZINHEIROS ====================
app.get('/api/cozinheiros', (req, res) => {
  db.query('SELECT * FROM cozinheiros ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

app.post('/api/cozinheiros', (req, res) => {
  const { nome, nivel, especialidade } = req.body;
  db.query('INSERT INTO cozinheiros (nome, nivel, especialidade) VALUES (?, ?, ?)', 
    [nome, nivel || null, especialidade || null], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ mensagem: 'Cozinheiro cadastrado!', id: result.insertId });
    });
});

app.put('/api/cozinheiros/:id', (req, res) => {
  const { id } = req.params;
  const { nome, nivel, especialidade } = req.body;
  db.query('UPDATE cozinheiros SET nome = ?, nivel = ?, especialidade = ? WHERE id = ?', 
    [nome, nivel || null, especialidade || null, id], (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Cozinheiro atualizado!' });
    });
});

app.delete('/api/cozinheiros/:id', (req, res) => {
  db.query('DELETE FROM cozinheiros WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Cozinheiro excluído!' });
  });
});

// ==================== ROTAS DE RECEITAS (VÍNCULO PRATO <-> INGREDIENTE) ====================
app.get('/api/receitas/:id_prato', (req, res) => {
  const query = `
    SELECT r.id, r.id_ingrediente, i.nome as ingrediente_nome, r.quantidade_necessaria, i.unidade 
    FROM receitas r 
    JOIN ingredientes i ON r.id_ingrediente = i.id 
    WHERE r.id_prato = ?
  `;
  db.query(query, [req.params.id_prato], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

app.post('/api/receitas', (req, res) => {
  const { id_prato, id_ingrediente, quantidade_necessaria } = req.body;
  db.query('INSERT INTO receitas (id_prato, id_ingrediente, quantidade_necessaria) VALUES (?, ?, ?)',
    [id_prato, id_ingrediente, quantidade_necessaria], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ mensagem: 'Ingrediente vinculado à receita!', id: result.insertId });
    });
});

app.delete('/api/receitas/:id', (req, res) => {
  db.query('DELETE FROM receitas WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Vínculo removido da receita!' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});