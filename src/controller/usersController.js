// Importação da classe AppError
const AppError = require("../utils/AppError")

// Importação da conexão com banco de dados
const sqliteConnection = require('../database/sqlite')

// Importação da biblioteca bcryptjs para criptografar a senha
const {hash, compare} = require("bcryptjs")

// Criação da classe usersController
class usersController{
    // criação dos metódos
   async create(request, response){
        const {name, email, password} = request.body;
        // Inicia a conexão com banco de dados
        const database = await sqliteConnection()

        // Verifica se o email já existe
        const checkUserEmailExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
         if(checkUserEmailExists){
            throw new AppError("Este email já existe!")
         }

        // Criptografa a senha
        const hashedPassword = await hash(password , 8)

        // Insere o novo usuário no banco de dados
        await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword ])

        return response.status(201).json()
    }

    // Criação do método de atualização (PUT)
    async update(request, response){
        const {name, email, password, oldPassword } = request.body
        const {id} = request.params

        const database = await sqliteConnection()

        // Busacar usuário correspondenete ao id
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

        if(!user){
            throw new AppError("Usuário não encontrado!")
        }
        // Buscar email de usuário que vai ser atualizado
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        // Verificar se email é igual ao id do mesmo usuário
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este email já está em uso!")
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // Verificar se o usuáriop digitou a senha antiga
        if(password && !oldPassword){
            throw new AppError("Você precisa informar a senha antiga para atualizar a nova senha!")
        }

        if(password && oldPassword){
            // Verifica se a senha antiga confere com a cadastrada no banco de dados
            const checkOldPassword = await compare (oldPassword, user.password)

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere!")
            }
            // Criptografa a nova senha
            user.password = await hash(password, 8)
        }

        await database.run(`UPDATE users SET 
            name = ?, 
            email = ?,
            password = ?, 
            updated_at = DATETIME("now")
            WHERE id = ?`,
            [user.name, user.email, user.password,  id])

        return response.status(200).json({"message": "Dados atualizado com sucesso!"})
    }

}
module.exports = usersController