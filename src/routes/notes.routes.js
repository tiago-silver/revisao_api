// mportação do Router do express
const {Router} = require("express")

//mportação do usersController
const NotesController = require("../controller/notesController")
// Inicilizar o Router
const notesRoutes = Router()



// Instanciando UsersController
const notesController = new NotesController()

// Definindo o metódo POST
notesRoutes.post("/:user_id", notesController.create)



module.exports = notesRoutes