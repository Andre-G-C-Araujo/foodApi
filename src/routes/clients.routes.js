const { Router } = require("express");

const ClientsController = require("../controllers/ClientsController");

const clientsController = new ClientsController();

const clientsRoutes = Router();

clientsRoutes.post("/", clientsController.create);
clientsRoutes.put("/:id", clientsController.update);
module.exports = clientsRoutes;
