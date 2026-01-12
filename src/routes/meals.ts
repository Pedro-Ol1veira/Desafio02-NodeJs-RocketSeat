import type { FastifyInstance } from "fastify";
import { knex } from "../database.js";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = createMealSchema.parse(
      request.body
    );

    const newMeal = {
        id: randomUUID(),
        user_id: sessionId,
        description,
        name,
        dateTime: Date.now(),
        onDiet: true
    };

    await knex('meals').insert(newMeal);

    reply.status(201).send();
  });
}
