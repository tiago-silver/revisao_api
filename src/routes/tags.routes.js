// mportação do Router do express
const {Router} = require("express")

//mportação do usersController
const TagsController = require("../controller/tagsController")
// Inicilizar o Router
const tagsRoutes = Router()

// Instanciando TagsController
const tagsController = new TagsController()

// Definindo os métodos
tagsRoutes.get("/:user_id", tagsController.index)



module.exports = tagsRoutes