// importação do banco de dados
// driver
const sqlite3 = require('sqlite3');
// Conexão
const sqlite = require('sqlite');
// Biblioteca para automatizar os diretórios independente dos sistema operacional
const path = require('path');

async function sqliteConnection(){
    const database = await sqlite.open({
        filename : path.resolve(__dirname, "..", "database.db"), 
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;