const { Client } = require('pg');

// Configurações de conexão com o banco de dados PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Magurofg2.',
  port: 5432, // Porta padrão do PostgreSQL
});

// Função para executar os comandos SQL
async function dropTables() {
  try {
    await client.connect(); // Conectar ao banco de dados

    // Comandos SQL para excluir as tabelas
    const dropCommands = [
      'DROP TABLE IF EXISTS agendamentos;',
      'DROP TABLE IF EXISTS consultas;',
      'DROP TABLE IF EXISTS pacientes;',
      'DROP TABLE IF EXISTS usuarios;',
      'DROP TABLE IF EXISTS SequelizeMeta;'
    ];

    for (const command of dropCommands) {
      await client.query(command);
      console.log(`Tabela excluída: ${command}`);
    }
  } catch (error) {
    console.error('Erro ao excluir tabelas:', error);
  } finally {
    await client.end(); // Fechar a conexão com o banco de dados
  }
}

// Executar a função para excluir as tabelas
dropTables();
