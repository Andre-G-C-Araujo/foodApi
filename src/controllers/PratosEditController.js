const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class PratoEditController {
  async update(req, res) {
    const {
      name,
      category,
      price,
      description,
      ingredients,
      oldIngredients,
      avatar,
      prato_id,
    } = req.body;

    //Precisa retornar ou id ou name.
    //Comparar qual nao bate (está fora da lista);
    //Pegar o que está fora, e passar pro knex pra deletar

    const ingredientsDb = await knex("ingredients").where({ prato_id });
    if (oldIngredients.length >= 1) {
      if (oldIngredients.length !== ingredientsDb.length) {
        await knex("ingredients").where({ prato_id }).delete();
        await knex("ingredients").insert(oldIngredients);
      }
    } else {
      await knex("ingredients").where({ prato_id }).delete();
    }

    if (ingredients.length > 0) {
      const ingredientsInsert = ingredients.map((name) => {
        return {
          name,
          prato_id,
        };
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    const prato = await knex("pratos").where({ id: prato_id }).first();

    if (!prato) {
      throw new AppError("Prato não existe");
    }

    prato.name = name ?? prato.name;
    prato.category = category ?? prato.category;
    prato.price = price ?? prato.price;
    prato.description = description ?? prato.description;
    prato.avatar = avatar ?? prato.avatar;

    await knex("pratos")
      .update({
        name,
        category,
        description,

        price,
        avatar,
      })
      .where({ id: prato_id });
    //   await knex("ingredients")
    //     .update({ name: ingredientsMapped })
    //     .where({ prato_id });
  }

  //   async updateAvatar(req, res) {
  //     const prato_id = req.prato.id;
  //     const avatarFileName = req.file.filename;
  //     const diskStorage = new DiskStorage();

  //     const prato = await knex("pratos").where({ id: prato_id }).first();

  //     if (!prato) {
  //       throw new AppError(
  //         "Somente usuários autenticados podem mudar o avatar",
  //         401
  //       );
  //     }

  //     if (prato.avatar) {
  //       await diskStorage.deleteFile(prato.avatar);
  //     }

  //     const filename = await diskStorage.saveFile(avatarFileName);
  //     prato.avatar = filename;

  //     await knex("pratos").update(prato).where({ id: prato_id });

  //     return res.json(prato);
  //   }
}

module.exports = PratoEditController;
