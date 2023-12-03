exports.up = (knex) =>
  knex.schema.createTable("admin", (table) => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.text("avatar").default(null);
    table.boolean("isAdmin").default(true);

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.createTable("admin", (table) => {});
