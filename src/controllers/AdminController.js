const { hash, compare } = require("bcryptjs");

const sqliteConnection = require("../database/sqlite");

class AdminController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO admin (name, email, password) VALUES (? , ? , ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;

    const admin_id = req.admin.id;

    const database = await sqliteConnection();
    const admin = await database.get("SELECT * FROM admin WHERE id = (?)", [
      admin_id,
    ]);

    if (!admin) {
      throw new AppError("Usúario não encontrado!");
    }

    const adminWithUpdatedEmail = await database.get(
      "SELECT * FROM clients WHERE email = (?)",
      [email]
    );

    if (adminWithUpdatedEmail && adminWithUpdatedEmail.id !== admin.id) {
      throw new AppError("Este e-mail já esta cadastrado!");
    }

    admin.name = name ?? admin.name;
    admin.email = email ?? admin.email;

    if (password && !old_password) {
      throw new AppError("Precisa informar senha antiga!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, admin.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      admin.password = await hash(password, 8);
    }

    if (password)
      await database.run(
        `
    UPDATE or IGNORE admin SET
     name = ?, 
     email = ?,
     password =?,
      updated_at = DATETIME('now'),
       id = ?
    `,
        [admin.name, admin.email, admin.password, admin_id]
      );

    return res.json();
  }
}

module.exports = AdminController;
