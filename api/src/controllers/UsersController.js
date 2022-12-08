const { hash, compare } = require('bcryptjs')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite') //Importa conexão com a base de dados

const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require('../services/UserCreateService')

class UsersController {
  // criado como uma classe para permitir criar várias funções

  // Criar novo usuário
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    return response.status(201).json()
  }

  // Alterar um usuário
  async update(request, response) {
    const { name, email, password, password_old } = request.body
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id
    ]) //Busca o usuário pelo id

    //Verifica se o usuário existe
    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    // Busca o e-mail na base de dados
    const verifyEmailInDb = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    // Verifica se o e-mail está cadastrado no banco de dados por outro usuário
    if (verifyEmailInDb && verifyEmailInDb.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.')
    }

    user.name = name ?? user.name //Utiliza o mesmo nome caso um novo nome não seja declarado
    user.email = email ?? user.email

    if (password && !password_old) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir uma nova senha.'
      )
    }

    if (password && password_old) {
      const verifyOldPassword = await compare(password_old, user.password)

      if (!verifyOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id =?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.json()
  }
}

module.exports = UsersController
