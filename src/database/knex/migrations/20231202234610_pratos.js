exports.up = (knex) =>
  knex.schema.createTable("pratos", (table) => {
    table.increments("id");
    table.text("name");
    table.text("category");
    table.text("description");
    table.text("avatar").default(null);
    table.text("price");

    table.integer("admin_id").references("id").inTable("admin");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("pratos", (table) => {});
