'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmService extends Service {

    async create(filmData) {
        const { Film } = this.server.models();

        const newFilm = await Film.query().insertAndFetch(filmData);

        return newFilm;
    }

    async findAll() {
        const { Film } = this.server.models();

        return Film.query();
    }

    async findById(id) {
        const { Film } = this.server.models();

        const film = await Film.query().findById(id);

        if (!film) {
            throw Boom.notFound('Film not found');
        }

        return film;
    }

    async update(id, filmData) {
        const { Film } = this.server.models();

        const updatedFilm = await Film.query().findById(id).patch(filmData);

        if (!updatedFilm) {
            throw Boom.notFound('Film not found');
        }

        return Film.query().findById(id);
    }

    async delete(id) {
        const { Film } = this.server.models();

        const deletedFilm = await Film.query().findById(id).delete();

        if (!deletedFilm) {
            throw Boom.notFound('Film not found');
        }

        return deletedFilm;
    }

    async addToFavorites(userId, filmId) {
        const { Favorite } = this.server.models();

        const existingFavorite = await Favorite.query().where({ userId, filmId }).first();
        if (existingFavorite) {
            throw Boom.badRequest('Film already in favorites');
        }

        const newFavorite = await Favorite.query().insert({ userId, filmId });

        return newFavorite;
    }

    async removeFromFavorites(userId, filmId) {
        const { Favorite } = this.server.models();

        const favorite = await Favorite.query().where({ userId, filmId }).first();
        if (!favorite) {
            throw Boom.badRequest('Film not in favorites');
        }

        await Favorite.query().delete().where({ userId, filmId });

        return { message: 'Film removed from favorites' };
    }

    async isFavorited(userId, filmId) {
        const { Favorite } = this.server.models();

        const favorite = await Favorite.query().where({ userId, filmId }).first();

        return favorite ? true : false;
    }
};
