// Importar o Router do express
const { Router } = require('express')

// Inicializa o router na variável routes
const routes = Router()

// importar as rotas (usersRoutes)
const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

// Ativar as rotas
routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)

// Exportar o routes
module.exports = routes