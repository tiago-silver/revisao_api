// Importção da conexão do banco de dados (sqliteConnection)
const sqliteConnection = require('../../sqlite')

// Importação co comando SQL para criação de usuários
const createUsers = require('./createUsers');

// Criação de execução das migrations
async function migrationsRun(){
    // vetor de migrations
    const schemas = [
        createUsers
    ].join('');

    // Executar os schemas
    sqliteConnection()
    .then( db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun;