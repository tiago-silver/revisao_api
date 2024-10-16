
const UserCreateServices = require("./UserCreateServices")
// importação do dados em memória
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")


// Utiliza o describe para separar os testes, por exemplo : criação de usuário e criação de notas
describe("UserCreateServices", ()=> {
    let userRepositoryInMemory = null
    let userCreateServices = null


    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateServices = new UserCreateServices(userRepositoryInMemory)
    })

    it("Se o usuário será criado",async()=>{
    
        // Para testes utiliza dados ficticios, afim de não poluir o banco de dados original
        const user = {
            name: "User Test",
            email : "user@test.com",
            password : "123"
        }
        // Para simular o banco de dados original, utiliza dados em memória
        const userCreated = await userCreateServices.execute(user)
       
        expect(userCreated).toHaveProperty("id")
    })

    it("O usuário não pode cadastrar com um email já existente!",async () => {
        const user1 = {
            name: "User Test 1",
            email : "user@test.com",
            password : "123"
        }
        const user2 = {
            name: "User Test 2",
            email : "user@test.com",
            password : "123"
        }

      

        await userCreateServices.execute(user1)
        await expect(userCreateServices.execute(user2)).rejects.toEqual(new AppError("Este email já existe!"))

    })

})
// Para criação de notas (é recomendado um describe por arquivo)
describe("NotesCreateService", ()=> {

})