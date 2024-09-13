// mportação do Router do express
const {Router} = require("express")

//mportação do usersController
const NotesController = require("../controller/notesController")
// Inicilizar o Router
const notesRoutes = Router()

// Instanciando UsersController
const notesController = new NotesController()

// Importar middleware do token do usuÁrio
 const ensureAuthentication = require("../middlewares/ensureAuthentication")
 
// utilizando as middlewares para todas as rotas
 notesRoutes.use(ensureAuthentication)

// Definindo os métodos
notesRoutes.get("/", notesController.index)
notesRoutes.post("/", notesController.create)

notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)



module.exports = notesRoutes