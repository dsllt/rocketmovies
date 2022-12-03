const config = require('../../../knexfile');
const knex = require('knex'); // Importa o knex

const connection = knex(config.development); // Cria conexão e indica as configurações de conexão

module.exports = connection;