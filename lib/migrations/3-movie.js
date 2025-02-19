'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('film', (table) => {
            table.increments('id').primary();  // clé primaire
            table.string('title').notNullable();  // titre du film
            table.text('description').notNullable();  // description
            table.date('releaseDate').notNullable();  // date de sortie
            table.string('director').notNullable();  // réalisateur
            table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();  // date de création
            table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();  // date de mise à jour
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');  // si on annule la migration, on supprime la table
    }
};
