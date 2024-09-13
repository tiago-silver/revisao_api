// Importar o verify do jsonwebtoken
const {verify} = require('jsonwebtoken');

// Importar AppError
const AppError = require('../utils/AppError')

// Importar as configurações de autenticação
const authConfig = require('../configs/auth');

// Funçação middleware 
function ensureAuthentication(request, response, next) {
    // Buscar o token do usuário no cabeçalho
    const authHeader = request.headers.authorization;

    // Verificação se existe token
    if(!authHeader){
        throw new AppError('Jwt Token não informado!', 401)
    }
    

    // Acessar através de um vetor as informações do headers, e quebrar o texto que a contém
    const [, token] = authHeader.split(" ")

    // Verificar de fato a validade do token
    try {

        // Buscar a propriedade sub de dentro de verify e "apelidar de user_id ( alias)"
        const { sub:user_id} = verify(token, authConfig.jwt.secret)

        // Criar uma propiedade dentro de request (user)
        request.user = {
            id: Number(user_id),
        };
       

        return next()
    } catch {
        throw new AppError('Jwt token inválido!', 401) 
    }


}

module.exports = ensureAuthentication