
const UserCreateServices = require("./UserCreateServices")
// importação do dados em memória
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")


// Utiliza o describe para separar os testes, por exemplo : criação de usuário e criação de notas
describe("UserCreateServices", ()=> {

    it("Se o usuário será criado",async()=>{
    
        // Para testes utiliza dados ficticios, afim de não poluir o banco de dados original
        const user = {
            name: "User Test",
            email : "user@test.com",
            password : "123"
        }
        // Para simular o banco de dados original, utiliza dados em memória
        const userRepositoryInMemory = new UserRepositoryInMemory()
        const userCreateServices = new UserCreateServices(userRepositoryInMemory)
        const userCreated = await userCreateServices.execute(user)
    
    
        console.log(userCreated)
        expect(userCreated).toHaveProperty("id")
    })

})
// Para criação de notas (é recomendado um describe por arquivo)
describe("NotesCreateService", ()=> {

})