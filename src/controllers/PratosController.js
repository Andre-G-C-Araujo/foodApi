const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class PratosController {
  async create(req, res) {
    const { name, category, description, price, ingredients } = req.body;
    const admin_id = req.admin.id;

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

    return res.json();
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

      pratos = await knex("ingredients")
        .select([
          "pratos.id",
          "pratos.name",
          "pratos.category",
          "pratos.description",
          "pratos.avatar",
          "pratos.price",
        ])
        // .whereIn("ingredients.name", filteredIngredients)
        .whereLike(
          // De acordo com o video usar WhereIn (porem é sensitive)
          "ingredients.name",
          `%${filteredIngredients}%`
        )
        .andWhereLike("pratos.name", `%${name}%`)
        .innerJoin("pratos", "pratos.id", "ingredients.prato_id")
        .orderBy("pratos.name");
    } else {
      pratos = await knex("pratos")
        .whereLike("name", `%${name}%`)
        .andWhereLike("category", `%${category}%`)
        .orderBy("name");
    }

    const PlatesWithIngredients = await knex("ingredients");

    const pratosMapped = pratos.map((plate) => {
      const plateIngredients = PlatesWithIngredients.filter(
        (ingredient) => ingredient.prato_id === plate.id
      );

      return {
        ...plate,
        ingredients: plateIngredients,
      };
    });

    return res.json(pratosMapped);
  }
  async createPhotoRef(req, res) {
    const avatar = req.file.filename;
    const diskStorage = new DiskStorage();

    await diskStorage.saveFile(avatar);

    await knex("pratos").where({ avatar: null }).update({
      avatar,
    });

    return res.json();
  }
}

module.exports = PratosController;
