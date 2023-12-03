const { Router } = require("express");

const clientsRoutes = require("./clients.routes");
const adminRoutes = require("./admin.routes");
const pratosRoutes = require("./pratos.routes");

const routes = Router();

routes.use("/clients", clientsRoutes);
routes.use("/admin", adminRoutes);
routes.use("/pratos", pratosRoutes);

module.exports = routes;
