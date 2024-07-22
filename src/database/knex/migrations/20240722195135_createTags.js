exports.up =  knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable();

    // Adiciona a chave estrangeira de notas em tags (onDelete = significa que essta tag se exclua automaticamente quando a nota for deletadas)
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    
    // Adiciona a chave estrangeira da tabela de usuário na tabela notes
    table.integer("user_id").references("id").inTable("users");
})


exports.down = knex => knex.schema.dropTable("tags", table => {})