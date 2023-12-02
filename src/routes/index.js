const { Router } = require("express");

const clientsRoutes = require("./clients.routes");

const routes = Router();

routes.use("/clients", clientsRoutes);

module.exports = routes;
