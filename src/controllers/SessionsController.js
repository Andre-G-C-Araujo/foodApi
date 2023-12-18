const knex = require("../database/knex");

const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const client = await knex("clients").where({ email }).first();
    const admin = await knex("admin").where({ email }).first();
    const { secret, expiresIn } = authConfig.jwt;

    if (!client && !admin) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    if (admin) {
      const passwordMatchedAdmin = await compare(password, admin.password);

      if (!passwordMatchedAdmin) {
        throw new AppError("E-mail e/ou senha incorreta", 401);
      } else {
        const tokenAdmin = sign({}, secret, {
          subject: String(admin.id),
          expiresIn,
        });

        return res.json({ admin, tokenAdmin });
      }
    }
    if (client) {
      const passwordMatchedClient = await compare(password, client.password);
      if (!passwordMatchedClient) {
        throw new AppError("E-mail e/ou senha incorreta", 401);
      } else {
        const tokenClient = sign({}, secret, {
          subject: String(client.id),
          expiresIn,
        });
        return res.json({ client, tokenClient });
      }
    }

    // return res.json({ client, tokenClient });
  }
}

module.exports = SessionsController;
