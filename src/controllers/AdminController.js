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
}

module.exports = AdminController;
