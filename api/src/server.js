require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations') // importa as migration
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload'); // improta as configurações de upload

const cors = require('cors'); //importa o cors
const express = require('express') // Importa express
const routes = require('./routes/') // Importa as rotas da aplicação

migrationsRun() // Executa as migrations, criando as tabelas que foram definidas

const app = express() //Inicializa express
app.use(cors()); //incializa o cors
app.use(express.json()) //Indica o formato do body da request

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER)); // buscar a imagem do usuário no banco de dados

app.use(routes) // Indica quais rotas devem ser usadas

// Indicação de que tipo de erro aconteceu
app.use((error, request, response, next) => {
  // erro gerado pelo cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  // erro do servidor
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333 //Porta que o express está observando
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) // Express começa a observar a porta indicada