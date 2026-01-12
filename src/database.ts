import { default as knexConfig} from 'knex';
import { env } from './env/index.js';

export const config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT == 'sqlite' ? {
        filename: env.DATABASE_URL
    } : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
};

export const knex = knexConfig(config);