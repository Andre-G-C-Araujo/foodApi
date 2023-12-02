const AppError = require("../utils/AppError");

class ClientsController {
  create(req, res) {
    const { name, email, password } = req.body;

    if ((!name && !email, !password)) {
      throw new AppError("Todos os campos são Obrigatorios!!");
    }
    res.status(201).json({ name, email, password });
  }
}

module.exports = ClientsController;
