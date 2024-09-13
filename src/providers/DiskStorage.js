// Biblioteca para lhe dar com manipulação de arquivos
const fs = require('fs');
//  Path para lhe dar com diretórios
const path = require('path');
// importar o uploadConfigs
const uploadConfig = require("../configs/upload")

class DiskStorage {
    // Função para salvar o arquuivo 
    async saveFile(file){
        // Mudar o arquibvo de lugar
        await fs.promises.rename(
            // Pega o arqyuivo da pasta temporária e envia para a pasta de uploads
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file),
        );

        return file;

    }

    async deleteFile(file){
        // Cria uma variável para pegar o endereço do na pasta de uploads
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        // fazer trativa para manipilações dde arquivo
        try {
            // Função stat retorna os status do arquivo
            await fs.promises.stat(filePath);
        } catch  {
            return;
        }
        // Função unlink deleta o arquivo
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;