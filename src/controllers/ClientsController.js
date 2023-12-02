const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class ClientsController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM clients WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    console.log(hashedPassword);

    await database.run(
      "INSERT INTO clients (name, email, password) VALUES (? , ? , ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;

    const { id } = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM clients WHERE id = (?)", [
      id,
    ]);

    if (!user) {
      throw new AppError("Usúario não encontrado!");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM clients WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já esta cadastrado!");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError("Precisa informar senha antiga!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    if (password)
      await database.run(
        `
    UPDATE or IGNORE clients SET
     name = ?, 
     email = ?,
     password =?,
      updated_at = DATETIME('now'),
       id = ?
    `,
        [user.name, user.email, user.password, user.id]
      );

    return res.json();
  }
}

module.exports = ClientsController;
