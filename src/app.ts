import fastify from 'fastify';
import { userRoutes } from './routes/user.js';
import cookies from '@fastify/cookie';

export const app = fastify();

app.register(cookies);

app.register(userRoutes, {
    prefix: 'users'
});