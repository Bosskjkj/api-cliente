const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do arquivo do banco de dados
// __dirname = diretório atual do arquivo
const dbPath = path.resolve(__dirname, '../config/database.db');

// Criar/abrir a conexão com o banco
const db = new sqlite3.Database(dbPath, (erro) => {
  if (erro) {
    console.error('❌ Erro ao conectar:', erro);
  } else {
    console.log('✅ Conectado ao SQLite!');
  }
});

// Criar a tabela se não existir (executado ao iniciar o servidor)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nome      TEXT NOT NULL,
      email     TEXT NOT NULL UNIQUE,
      telefone  TEXT NOT NULL,
      cpf       TEXT NOT NULL UNIQUE,
      endereco  TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (erro) => {
    if (erro) {
      console.error('❌ Erro ao criar tabela clientes:', erro);
    } else {
      console.log('✅ Tabela clientes verificada/criada');
    }
  });
});

// IMPORTANTE: Exportar o objeto 'db' diretamente
// NÃO exportar dentro de um objeto { db }
module.exports = db;