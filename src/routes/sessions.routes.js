const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create);
// sessionsRoutes.post("/", sessionsController.createAdmin);

module.exports = sessionsRoutes;
