const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class ClientsController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const checkClientExists = await database.get(
      "SELECT * FROM clients WHERE email = (?)",
      [email]
    );

    if (checkClientExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO clients (name, email, password) VALUES (? , ? , ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;

    const client_id = req.client.id;

    const database = await sqliteConnection();
    const client = await database.get("SELECT * FROM clients WHERE id = (?)", [
      client_id,
    ]);

    if (!client) {
      throw new AppError("Usúario não encontrado!");
    }

    const clientWithUpdatedEmail = await database.get(
      "SELECT * FROM clients WHERE email = (?)",
      [email]
    );

    if (clientWithUpdatedEmail && clientWithUpdatedEmail.id !== client.id) {
      throw new AppError("Este e-mail já esta cadastrado!");
    }

    client.name = name ?? client.name;
    client.email = email ?? client.email;

    if (password && !old_password) {
      throw new AppError("Precisa informar senha antiga!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, client.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      client.password = await hash(password, 8);
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
        [client.name, client.email, client.password, client_id]
      );

    return res.json();
  }
}

module.exports = ClientsController;
