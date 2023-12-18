const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticatedAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: admin_id } = verify(token, authConfig.jwt.secret);

    req.admin = {
      id: Number(admin_id),
    };

    return next();
  } catch {
    throw new AppError("JWT Token não informado", 401);
  }
}

module.exports = ensureAuthenticatedAdmin;
