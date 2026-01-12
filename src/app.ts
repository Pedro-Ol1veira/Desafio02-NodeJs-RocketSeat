import fastify from 'fastify';
import { userRoutes } from './routes/user.js';
import cookies from '@fastify/cookie';
import { mealsRoutes } from './routes/meals.js';
import { checkSessionId } from './middlewares/check-sessionId.js';

export const app = fastify();

app.register(cookies);

app.register(mealsRoutes, {
    prefix: 'meals'
});

app.register(userRoutes, {
    prefix: 'users'
});