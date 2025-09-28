exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('slots', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.integer('day_of_week').notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('slot_exceptions', table => {
      table.increments('id').primary();
      table.integer('slot_id').notNullable().references('id').inTable('slots').onDelete('CASCADE');
      table.date('exception_date').notNullable();
      table.string('action').notNullable();
      table.string('new_title');
      table.time('new_start_time');
      table.time('new_end_time');
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('slot_exceptions'),
    knex.schema.dropTableIfExists('slots')
  ]);
};