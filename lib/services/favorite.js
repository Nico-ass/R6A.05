'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    async isFavorited(userId, filmId) {
        const { Favorite } = this.server.models();

        if (!userId || !filmId) {
            console.warn('isFavorited: Missing userId or filmId', { userId, filmId });
            return false;
        }

        const favorite = await Favorite.query()
            .where({ user_id: userId, film_id: filmId })
            .skipUndefined()
            .first();

        return !!favorite;
    }

    async addToFavorites(userId, filmId) {
        const { Favorite } = this.server.models();

        if (!userId || !filmId) {
            throw new Error('Missing userId or filmId');
        }

        try {
            return await Favorite.query().insert({
                user_id: userId,
                film_id: filmId
            });
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw new Error('Could not add favorite');
        }
    }

    async removeFromFavorites(userId, filmId) {
        const { Favorite } = this.server.models();

        if (!userId || !filmId) {
            throw new Error('Missing userId or filmId');
        }

        try {
            const deletedCount = await Favorite.query()
                .where({ user_id: userId, film_id: filmId })
                .skipUndefined()
                .delete();

            if (deletedCount === 0) {
                throw new Error('Favorite not found');
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw new Error('Could not remove favorite');
        }
    }
};
