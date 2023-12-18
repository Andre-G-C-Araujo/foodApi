const knex = require("../database/knex");

const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class ClientAvatarController {
  async update(req, res) {
    const client_id = req.client.id;
    const avatarFileName = req.file.filename;
    const diskStorage = new DiskStorage();

    const client = await knex("clients").where({ id: client_id }).first();

    if (!client) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    if (client.avatar) {
      await diskStorage.deleteFile(client.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFileName);
    client.avatar = filename;

    await knex("clients").update(client).where({ id: client_id });

    return res.json(client);
  }
}

module.exports = ClientAvatarController;
