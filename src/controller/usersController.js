// Importação da classe AppError
const AppError = require("../utils/AppError")

// Importação da conexão com banco de dados
const sqliteConnection = require('../database/sqlite')

// Importação da biblioteca bcryptjs para criptografar a senha
const {hash, compare} = require("bcryptjs")

// Importe da classe de reposditóriod
const UsersRepository = require("../repositories/UsersRepository")

// Import do service que separa a regra de negócio da lógica de dados e da controller
const UserCreateServices = require("../services/UserCreateServices")

// Criação da classe usersController
class usersController{
    // criação dos metódos
   async create(request, response){
        const {name, email, password} = request.body;
       
        // instanciar userRepositories
        const userRepository = new UsersRepository()

        // Instanciar a classe de services
        const userCreateServices = new UserCreateServices(userRepository)
        // Chama o método execute dentro de service
        await userCreateServices.execute({name, email, password})
        


        return response.status(201).json({message: "Usuário cadastrado com sucesso!"})
    }


    // Criação do método de atualização (PUT)
    async update(request, response){
        const {name, email, password, oldPassword } = request.body

        // Mudar a forma de pegar o id do usuário 
        const user_id = request.user.id;
        

        const database = await sqliteConnection()

        // Busacar usuário correspondenete ao id
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

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
            [user.name, user.email, user.password, user_id])

        return response.status(200).json({"message": "Dados atualizado com sucesso!"})
    }

}
module.exports = usersController