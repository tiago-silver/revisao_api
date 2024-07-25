//  importar o knex
const { request } = require("express");
const knex = require("../database/knex")

class NotesController{
    async create(request, response){
        const { title, description, tags, links  } = request.body
        const { user_id} = request.params
        // Insere a nota com o id do usuário e retorna o id da nota
        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        });

        // Para cada link retornar o id da nota e a url
        const linksInsert = links.map(link => {
            return {
                note_id,
                url : link
            }
        })

        await knex("links").insert(linksInsert);


        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert);
        response.json()
    }

    // Método para mostrar notas
    async show(request, response) {
        const { id} = request.params;

        // Busca notas no banco de dados 
        const note = await knex("notes").where({id}).first();

        // Buscar as tags e links
        const tags = await knex("tags").where({note_id: id}).orderBy("name")
        const links = await knex("links").where({note_id: id}).orderBy("created_at")

        return response.json({
            ...note,
            tags,
            links
        })


    }

    // Método para deletar notas
    async delete(request, response){
        const {id} = request.params

        await knex("notes").where({id}).delete()

        response.json();
    }

    // Método para listar notas
    async index(request, response){
        const {user_id} = request.query

        const notes = await knex("notes").where({user_id}).orderBy("title")

        response.json({notes})
    }
}
module.exports = NotesController