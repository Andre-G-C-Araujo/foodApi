const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class ClientsFavController {
  async saveFav(req, res) {
    const client_id = req.client.id;
    const { plateId, client } = req.body;

    client.favorites = JSON.stringify(plateId);

    console.log(client);
    await knex("clients").update(client).where({ id: client_id });

    if (!client) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    return res.json(client);
  }
}

module.exports = ClientsFavController;
