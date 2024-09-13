// mportação do Router do express
const {Router} = require("express")

// Importar as middlewares
const ensureAuthentication = require("../middlewares/ensureAuthentication")
//mportação do usersController
const TagsController = require("../controller/tagsController")
// Inicilizar o Router
const tagsRoutes = Router()

// Instanciando TagsController
const tagsController = new TagsController()

// Definindo os métodos
tagsRoutes.get("/", ensureAuthentication, tagsController.index)



module.exports = tagsRoutes