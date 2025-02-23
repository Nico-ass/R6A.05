'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/films',
        options: {
            auth: false,
            tags: ['api']
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            const films = await filmService.findAll();
            return h.response(films).code(200);
        }
    },
    {
        method: 'post',
        path: '/films',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(1).description('Title of the film'),
                    description: Joi.string().required().description('Description of the film'),
                    releaseDate: Joi.date().required().description('Release date of the film'),
                    director: Joi.string().required().description('Director of the film')
                })
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.create(request.payload);
        }
    },
    {
        method: 'patch',
        path: '/films/{id}',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                }),
                payload: Joi.object({
                    title: Joi.string().min(1).description('Title of the film'),
                    description: Joi.string().description('Description of the film'),
                    releaseDate: Joi.date().description('Release date of the film'),
                    director: Joi.string().description('Director of the film')
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { filmService } = request.services();
                return await filmService.update(request.params.id, request.payload);
            } catch (error) {
                console.error("Error when updating:", error);
                return h.response({ error: 'Error when updating' }).code(500);
            }
        }
    },
    {
        method: 'delete',
        path: '/films/{id}',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { filmService } = request.services();
                return await filmService.delete(request.params.id);
            } catch (error) {
                console.error("Error when deleting:", error);
                return h.response({ error: 'Error when deleting' }).code(500);
            }
        }
    },
    {
        method: 'post',
        path: '/films/{id}/favorites',
        options: {
            auth: { scope: ['user'] },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService, filmService } = request.services();
            const userId = request.auth.credentials?.id;
            const filmId = request.params?.id;
            console.log("userId:", userId);
            console.log("filmId:", filmId);

            if (!userId || !filmId) {
                return h.response({ error: 'Invalid user ID or film ID' }).code(400);
            }

            const film = await filmService.findById(filmId);
            if (!film) {
                return h.response('Film not found').code(404);
            }

            const alreadyFavorited = await favoriteService.isFavorited(userId, filmId);
            if (alreadyFavorited) {
                return h.response('Film already in favorites').code(400);
            }

            await favoriteService.addToFavorites(userId, filmId);
            return h.response('Film added to favorites').code(201);
        }
    },
    {
        method: 'delete',
        path: '/films/{id}/favorites',
        options: {
            auth: { scope: ['user'] },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService, filmService } = request.services();
            const userId = request.auth.credentials?.id;
            const filmId = request.params?.id;

            if (!userId || !filmId) {
                return h.response({ error: 'Invalid user ID or film ID' }).code(400);
            }

            const film = await filmService.findById(filmId);
            if (!film) {
                return h.response('Film not found').code(404);
            }

            const isFavorited = await favoriteService.isFavorited(userId, filmId);
            if (!isFavorited) {
                return h.response('Film not in favorites').code(400);
            }

            await favoriteService.removeFromFavorites(userId, filmId);
            return h.response('Film removed from favorites').code(200);
        }
    }
];
