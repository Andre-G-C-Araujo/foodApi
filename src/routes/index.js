const { Router } = require("express");

const clientsRouter = require("./clients.routes");
const adminRouter = require("./admin.routes");
const pratosRouter = require("./pratos.routes");
const ingredientsRouter = require("./ingredients.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/clients", clientsRouter);
routes.use("/admin", adminRouter);
routes.use("/pratos", pratosRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;
