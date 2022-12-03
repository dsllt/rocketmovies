const { compare } = require('bcryptjs')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const { sign } = require(`jsonwebtoken`)

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    // Acessa o banco de dados, busca o usuário e filtra pelo email
    const user = await knex('users').where({ email }).first()

    // Validação se o usuário existe
    if (!user) {
      throw new AppError('E-mail e/ou senha incorretos', 401)
    }
    // Comparar senha digitada no login com senha da base dados
    const passwordMatch = await compare(password, user.password)

    // Validação da senha
    if (!passwordMatch) {
      throw new AppError('E-mail e/ou senha incorretos', 401)
    }

    // Desestruturar itens de autenticação
    const { secret, expiresIn } = authConfig.jwt

    // Criar o token
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController
