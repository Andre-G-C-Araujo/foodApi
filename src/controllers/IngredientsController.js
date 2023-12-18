const knex = require("../database/knex");

class IngredientsController {
  async index(req, res) {
    const ingredients = await knex("ingredients");

    return res.json(ingredients);
  }
}

module.exports = IngredientsController;
