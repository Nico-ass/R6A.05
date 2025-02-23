'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('film', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').notNullable();
            table.date('releaseDate').notNullable();
            table.string('director').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');
    }
};
