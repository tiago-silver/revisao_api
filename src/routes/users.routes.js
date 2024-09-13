// mportação do Router do express
const {Router} = require("express")

// importar o multer (uoload de arquivos)
const multer = require("multer")
const uploadConfig = require("../configs/upload")

//mportação do usersController
const UsersController = require("../controller/usersController")
// import userAvatarController
const UserAvatarController = require("../controller/UserAvatarController")
// Importar as middlewares de autenticação
const ensureAuthentication = require("../middlewares/ensureAuthentication")

// Inicilizar o Router
const usersRoutes = Router()
// Ativar o multer passando uploadeConfig como parametro
const upload = multer(uploadConfig.MULTER);


// Instanciando UsersController
const usersController = new UsersController()
// instanciando UserAvatarController
const userAvatarController = new UserAvatarController()


// Definindo o metódo POST
// Rota de criaçãp de usuário
usersRoutes.post("/", usersController.create)
// Insere as middewares nas rotas necessarias 
usersRoutes.put("/", ensureAuthentication, usersController.update)
// Rota de atualizaçõa de imagem do usuário
usersRoutes.patch("/avatar", ensureAuthentication, upload.single("avatar"), userAvatarController.update  )


module.exports = usersRoutes