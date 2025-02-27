'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags:['api'],
            validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                email: Joi.string().required().email().example('john@doe.fr').description('Email of the user'),
                password: Joi.string().required().example('password').description('Password of the user'),
                username: Joi.string().required().example('johndoe').description('Username of the user')
            })
        }
    },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth: false,
            tags:['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.findAll();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: false,
            tags:['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.delete(request.params.id);
        }
    },
        {
            method: 'patch',
            path: '/user/{id}',
            options: {
                tags:['api'],
                auth : {
                    scope : ['admin']
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().required().min(1)
                    }),
                    payload: Joi.object({
                        firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                        lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                        email: Joi.string().email().example('john@doe.fr').description('Email of the user'),
                        password: Joi.string().example('password').description('Password of the user'),
                        username: Joi.string().example('johndoe').description('Username of the user')
                    })
                }
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                return await userService.update(request.params.id, request.payload);
            }
        },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags:['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required().example('john@doe.fr').description('Email of the user'),
                    password: Joi.string().required().example('password').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.login(request.payload.email, request.payload.password);
        }
    },
    // test route to create an admin user
    {
        method: 'post',
        path: '/admin-test',
        options: {
            auth: false, // Pas besoin d'authentification pour cette route de test
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Admin').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('User').description('Lastname of the user'),
                    email: Joi.string().required().email().example('admin@domain.com').description('Email of the user'),
                    password: Joi.string().required().example('adminpassword').description('Password of the user'),
                    username: Joi.string().required().example('adminuser').description('Username of the user'),
                    roles: Joi.array().items(Joi.string()).default(['user', 'admin']).description('Roles of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            // Créer l'utilisateur admin
            const adminUser = await userService.create(request.payload);

            return h.response(adminUser).code(201);
        }
    }

];
