// Import knex
const knex = require('../database/knex');

class TagsController {

    async index(request, response){
        // Mudar a forma de obter a o id
        const user_id = request.user.id

        const tags = await knex("tags")
        .where({user_id})
        .groupBy("name")

        return response.json(tags)
    }

}
module.exports = TagsController