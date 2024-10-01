
// importação do express
const express = require('express')
// Importação da biblioteca express async-errors
require("express-async-errors")
// Ativação do dotenv para o acesso das variáveis de ambiente
require("dotenv/config")
// Importar a classe AppError
const AppError = require("./utils/AppError")
// Importar migrationsRun
const migrationsRun = require("./database/sqlite/migrations")
// importa as rotas
const routes = require("./routes")
// Importação da configurações de uploads
const uploadConfig = require("./configs/upload")

// Iniciallização do express
const app = express()

// Importação do cors (Biblioteca para conectar p beck com front)
const cors = require("cors")

// Definição do formato da saída de informações da api
app.use(express.json())

// Ativar o cors 
app.use(cors())

// Ativar para buscar a imagem de perfil do usuário
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

// Ativar as rotas
app.use(routes)

// Ativar migrations
migrationsRun()

// Capturar o erros, req,res e next
app.use((error, request, response, next) =>{
    // Verificaçao de erro do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status : 'error',
            message: error.message
        })
    }

    console.error(error)

    // Verificação de erro de servidor
    return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
    })
})


// informando o endereço da porta 
const PORT = process.env.PORT || 3333

// Ativar o servidor
app.listen(PORT, (()=> console.log(`O servidor estar rodando na porta ${PORT}`)))