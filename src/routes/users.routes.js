// mportação do Router do express
const {Router} = require("express")

// Inicilizar o Router
const usersRoutes = Router()
//mportação do usersController
const UsersController = require("../controller/usersController")



// Instanciando UsersController
const usersController = new UsersController()

// Definindo o metódo POST
usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)


module.exports = usersRoutes