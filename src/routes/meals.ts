import type { FastifyInstance } from "fastify";
import { knex } from "../database.js";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { checkSessionId } from "../middlewares/check-sessionId.js";

export async function mealsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', checkSessionId);
    
  app.post("/", async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = createMealSchema.parse(request.body);

    const newMeal = {
      id: randomUUID(),
      user_id: sessionId,
      description,
      name,
      dateTime: Date.now(),
      onDiet: true,
    };

    await knex("meals").insert(newMeal);

    reply.status(201).send();
  });

  app.get("/", async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const meals = await knex("meals").where("user_id", sessionId).select();

    return { meals };
  });

  app.get('/:id', async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const getParamsData = z.object({
        id: z.uuid()
    });
    
    const { id } = getParamsData.parse(request.params);
    const meal = await knex('meals').where('id', id).select().first();

    if(meal.user_id != sessionId) {
        return reply.status(401).send({
            error: "Unauthorized"
        });
    }

    return { meal }
  })
}
