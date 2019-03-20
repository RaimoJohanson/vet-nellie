const DECISIONS = [
  { value: 'DIAGNOOS 1' }, { value: 'DIAGNOOS 2' }, { value: 'DIAGNOOS 3' }, { value: 'DIAGNOOS 4' },
];
const INSTANCE = [
  { decision_id: 1 },
  { decision_id: 2 }, { decision_id: 2 },
  { decision_id: 3 }, { decision_id: 3 }, { decision_id: 3 },
  { decision_id: 4 },
];
const FEATURES = [
  { value: 'Kas ta oksendab?' },
  { value: 'Kas ta on loid?' },
  { value: 'Kas ta on isutu?' },
  { value: 'Kas ta roojab?' },
  { value: 'Kas ta urineerib?' },
  { value: 'Kas esineb stranguuriat?' },
  { value: 'Kas loomal on PU/PD?' },
  { value: 'Kas kõht on lahti?' },
  { value: 'Kas ta köhib?' },
  { value: 'Kas ta lõõtsutab?' },
  { value: 'Kas ta koormustaluvus on langenud?' },
  { value: 'Kas ta lakub/närib varbavahesid?' },
  { value: 'Kas esineb blefarospasmi?' },
  { value: 'Kas kõhuümbermõõt on suurenenud?' },
  { value: 'Kas ta sügeleb?' },
  { value: 'Kas ta raputab pead?' },
  { value: 'Kas ta kraabib kõrvu?' },
  { value: 'Kas ta on vaktsineeritud?' },
  { value: 'Kas loomaga on käidud välismaal?' },
  { value: 'Kas ta ussirohtu on saanud?' },
];
const FEATURE_INSTANCE = [
  { feature_id: 1, instance_id: 1 },
  { feature_id: 2, instance_id: 1 },
  { feature_id: 3, instance_id: 1 },
  { feature_id: 4, instance_id: 1 },
  { feature_id: 2, instance_id: 2 },
  { feature_id: 5, instance_id: 2 },
  { feature_id: 6, instance_id: 2 },
  { feature_id: 6, instance_id: 3 },
  { feature_id: 4, instance_id: 3 },
  { feature_id: 4, instance_id: 4 },
  { feature_id: 1, instance_id: 4 },
  { feature_id: 3, instance_id: 4 },
  { feature_id: 3, instance_id: 5 },
  { feature_id: 2, instance_id: 6 },
  { feature_id: 5, instance_id: 6 },
  { feature_id: 18, instance_id: 7 },
  { feature_id: 7, instance_id: 7 },
  { feature_id: 21, instance_id: 6 },
  { feature_id: 20, instance_id: 6 },
  { feature_id: 21, instance_id: 7 },
  { feature_id: 15, instance_id: 7 },
  { feature_id: 18, instance_id: 3 },
  { feature_id: 10, instance_id: 4 },
  { feature_id: 11, instance_id: 4 },
  { feature_id: 12, instance_id: 4 },
  { feature_id: 13, instance_id: 5 },
  { feature_id: 13, instance_id: 6 },
  { feature_id: 14, instance_id: 6 },
  { feature_id: 19, instance_id: 7 },
  { feature_id: 16, instance_id: 7 },
];

exports.up = async (knex) => {
  /* eslint-disable */
  await knex.schema.createTableIfNotExists('decision', (table) => {
    table.increments('id').primary().unique();
    table.string('value').notNullable();
    table.integer('created_by').unsigned();
    table.integer('updated_by').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });

  await knex.schema.createTableIfNotExists('instance', (table) => {
    table.increments('id').primary().unique();
    table.integer('decision_id').unsigned().references('decision.id').notNullable().onDelete('CASCADE');
    table.integer('created_by').unsigned();
    table.integer('updated_by').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });

  await knex.schema.createTableIfNotExists('feature', (table) => {
    table.increments('id').primary().unique();
    table.string('value').notNullable();
    table.integer('created_by').unsigned();
    table.integer('updated_by').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });

  await knex.schema.createTableIfNotExists('feature_instance', (table) => {
    table.integer('feature_id').unsigned().references('feature.id').notNullable().onDelete('CASCADE'); 
    table.integer('instance_id').unsigned().references('instance.id').notNullable().onDelete('CASCADE');
  });
  /* eslint-enable */

  // await knex('decision').insert(DECISIONS);
  // await knex('instance').insert(INSTANCE);
  await knex('feature').insert(FEATURES);
  // await knex('feature_instance').insert(FEATURE_INSTANCE);
};

exports.down = knex => knex.schema
  .dropTableIfExists('feature_instance')
  .dropTableIfExists('feature')
  .dropTableIfExists('instance')
  .dropTableIfExists('decision');
