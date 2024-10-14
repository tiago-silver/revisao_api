const AppError = require("../utils/AppError")
const {hash} = require("bcryptjs")
class UserCreateServices {

    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute({name, email, password}){

        // Verifica se o email já existe
        const checkUserEmailExists = await this.usersRepository.findByEmail(email)
        
        if(checkUserEmailExists){
            throw new AppError("Este email já existe!")
        }

        // Criptografa a senha
        const hashedPassword = await hash(password , 8)

        // Insere o novo usuário no banco de dados
        const userCreated = await this.usersRepository.create({name, email, password: hashedPassword})

        return userCreated
    }
}

module.exports = UserCreateServices