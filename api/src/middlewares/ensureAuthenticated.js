const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated (request, response, next){
  // Acessar o cabeçalho de autentcação
  const authHeader = request.headers.authorization;

  // Verificar se o authHeader existe
  if(!authHeader){
    throw new AppError('JWT Token não informado', 401);
  }

  // Salvando apenas o número do token que está no header
  const [, token] = authHeader.split(' ');

  // Verificar se o token é válido
  try {
    const { sub: user_id } = verify (token, authConfig.jwt.secret);

    // Dentro da requisicão é criado uma nova propriedade para a id do usuário
    request.user = {
      id: Number(user_id),
    };
    return next();
  } catch {
    throw new AppError('JWT Token Inválido', 401);
  }

}

module.exports = ensureAuthenticated;