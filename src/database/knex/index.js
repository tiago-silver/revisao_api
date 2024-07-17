// Importar o arquivo knexfile.js
const config = require("../../../knexfile")

// importar o knex
const knex = require("knex")

// Utilizar a conexão padrão do knexfile
const connection = knex(config.development)

module.exports = connection;

