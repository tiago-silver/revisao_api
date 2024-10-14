const sqliteConnection = require('../database/sqlite')

class UsersRepository {
    async findByEmail(email) {
        // Inicia a conexão com banco de dados
        const database = await sqliteConnection()

        // Verifica se o email já existe
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        return user
    }

    async create({name, email, password}) {
        const database = await sqliteConnection()

        // Verifica se o email já existe
        const userId = await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, password ])

        
        return {id: userId}
    }
}

module.exports = UsersRepository