import { config } from "dotenv";
import { z } from "zod";

if(process.env.NODE_ENV == 'test') {
    config({path: '.env.test'})
} else {
    config();
}

const envSchema = z.object({
    NODE_ENV: z.enum(['test', 'production', 'development']).default('production'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    DATABASE_CLIENT: z.enum(['sqlite', 'ph'])
});

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
    console.error("Invalid Envaironments Variables", _env.error.format());
    throw new Error("Invalid Envaironments Variables")
}

export const env = _env.data;
