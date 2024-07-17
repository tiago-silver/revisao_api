// Importar o Router do express
const { Router } = require('express')

// Inicializa o router na variável routes
const routes = Router()

// importar as rotas (usersRoutes)
const usersRoutes = require("./users.routes")

// Ativar as rotas
routes.use("/users", usersRoutes)

// Exportar o routes
module.exports = routes