const knex = require("../database/knex");

class PratosController {
  async create(req, res) {
    const { name, category, description, price, ingredients } = req.body;

    const { admin_id } = req.params;

    const [prato_id] = await knex("pratos").insert({
      name,
      category,
      description,
      price,
      admin_id,
    });
    const ingredientsInsert = ingredients.map((name) => {
      return {
        name,
        prato_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const prato = await knex("pratos").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ prato_id: id })
      .orderBy("name");

    return res.json({
      ...prato,
      ingredients,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("pratos").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { name, category, ingredients } = req.query;
    let pratos;

    if (ingredients) {
      const filteredIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      pratos = await knex("ingredients").whereLike(
        // De acordo com o video usar WhereIn (porem é sensitive)
        "name",
        `${filteredIngredients}`
      );
    } else {
      pratos = await knex("pratos")
        .whereLike("name", `%${name}%`)
        .andWhereLike("category", `%${category}%`)
        .orderBy("name");
    }

    return res.json({ pratos });
  }
}

module.exports = PratosController;
