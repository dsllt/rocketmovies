const sqliteConnection = require("../../sqlite"); 
const createUsers = require("./createUsers");

async function migrationsRun(){
 const schemas = [ //indica as tabelas que serão criadas
  createUsers
 ].join('')

 sqliteConnection() //faz conexão com servidor
 .then(db => db.exec(schemas)) // executa as migrations (criação de tabelas)
 .catch(error => console.error(error)) // mostra erros, caso ocorram
}

module.exports = migrationsRun;