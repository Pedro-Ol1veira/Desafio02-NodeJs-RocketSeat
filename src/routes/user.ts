import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database.js";
import { randomUUID } from "node:crypto";

export async function userRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      weight: z.coerce.number(),
    });

    const { name, email, weight } = createUserSchema.parse(request.body);

    const newUser = {
        id: randomUUID(),
        name,
        email,
        weight
    };

    reply.cookie('sessionId', newUser.id, {
        path: '/',
        maxAge: 60 * 60 * 24
    });

    await knex('users').insert(newUser);

    reply.status(201).send();
  });
}
