const { Router } = require('express');
const usersRoutes = Router(); //incializa o router

const UsersController = require('../controllers/UsersController'); // importa o controller
const usersController = new UsersController(); //instacia na memória 

const ensureAuthenticated = require('../middlewares/ensureAuthenticated'); // Importa o middleware de autenticação

const multer = require('multer'); //importa o multer
const uploadConfig = require('../configs/upload'); //importa as configurações de upload
const upload = multer(uploadConfig.MULTER); //inicializa o multer

const UserAvatarController = require('../controllers/UserAvatarController'); // importa o useravatarcontrolet
const userAvatarController = new UserAvatarController(); // Instancia o useravatarcontroller

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = usersRoutes; // expõe a rota para que o servidor consiga usar
