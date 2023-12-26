const knex = require("../database/knex");

const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class AdminAvatarController {
  async update(req, res) {
    const admin_id = req.admin.id;
    const avatarFileName = req.file.filename;
    const diskStorage = new DiskStorage();

    const admin = await knex("admin").where({ id: admin_id }).first();
    if (!admin) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    if (admin.avatar) {
      await diskStorage.deleteFile(admin.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFileName);
    admin.avatar = filename;

    await knex("admin").update(admin).where({ id: admin_id });

    return res.json(admin);
  }
}

module.exports = AdminAvatarController;
