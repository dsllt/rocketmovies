const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController{
  async update(request, response){
    //Pegar o id e nome do arquivo recebidos an request
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    // Instanciar o diskStorage
    const diskStorage = new DiskStorage();

    //Usando o knex para acessar a tabela de usuários do banco
    const user = await knex('users').where({ id: user_id }).first();

    // Verificar se o usuário existe
    if(!user){
      throw new AppError("Somente usuários autenticados podem trocar a foto do avatar", 401);
    }

    // Verificar se um usuário já possui avatar. Caso exista, deletar o antigo e colocar o atual
    if(user.avatar){
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    // Atualiza o banco de dados
    await knex('users').update(user).where({ id: user_id });

    return response.json(user);

  }
}

module.exports = UserAvatarController;