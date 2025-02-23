'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.integer('film_id').unsigned().notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();

            table.foreign('user_id').references('user.id').onDelete('CASCADE');
            table.foreign('film_id').references('film.id').onDelete('CASCADE');

            table.unique(['user_id', 'film_id']);
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }
};
