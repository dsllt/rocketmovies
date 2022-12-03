const { Router } = require('express')

const usersRouter = require('./users.routes'); // importa as rotas dos usuários
const notesRouter = require('./notes.routes');
const tagsRouter = require('./tags.routes');
const sessionsRouter = require('./sessions.routes');

const routes = Router()

routes.use('/users', usersRouter); //indica para qual rota será redirecionado ao acessar o caminho /users
routes.use('/notes', notesRouter);
routes.use('/tags', tagsRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes; //exporta o grupo de rotas
