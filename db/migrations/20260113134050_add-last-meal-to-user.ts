import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.boolean('lastMealState').defaultTo(false);
        table.integer('bestStrike').defaultTo(0);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('lastMealState');
        table.dropColumn('bestStrike');
    })
}

