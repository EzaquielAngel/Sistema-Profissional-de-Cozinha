// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: 'SilentHill1997.', 
  database: 'cozinha_japonesa', 
  port: 3306               
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado com sucesso ao MySQL no banco "cozinha_japonesa"!');
});

module.exports = connection;