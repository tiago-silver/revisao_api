const knex = require('../database/knex');
const AppError = require("../utils/AppError");

// Import o DiskStorage
const DiskStorage = require('../providers/DiskStorage')




class UserAvatarController {
    async update (request, response){
        const user_id = request.user.id;
        // Buscar o arquivo o usuário fez upload
        const avatarFilename = request.file.filename;

        // Instanciar Diskstorage
        const diskStorage = new DiskStorage()

        // Buscar o usuário no banco de dados
        const user = await knex("users").where({id: user_id}).first()

        // Verificar se o usuário existe
        if(!user){
            throw new AppError("Somente usuários cadastrados podem mudar o avatar!", 401)
        }

        // Verifica se existe o avatar do usuário
        if(user.avatar){
            // Se existir, excluir o arquivo
            await diskStorage.deleteFile(user.avatar)
        }
        // Se não , salvar o arquivo na pasta uploads
        const filename = await diskStorage.saveFile(avatarFilename)
        user.avatar = filename

        // Salvar o arquivo no banco de dados
        await knex("users").update(user).where({ id: user.id});

        return response.json({message : "Foto do perfil atualizado com sucesso!", user});
        
    }

}

module.exports = UserAvatarController;