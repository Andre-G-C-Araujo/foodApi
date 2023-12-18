const { Router } = require("express");

const PratosController = require("../controllers/PratosController");
const ensureAuthenticatedAdmin = require("../middlewares/ensureAuthenticatedAdmin");

const pratosController = new PratosController();

const pratosRoutes = Router();

pratosRoutes.use(ensureAuthenticatedAdmin);

pratosRoutes.get("/", pratosController.index);
pratosRoutes.post("/", pratosController.create);
pratosRoutes.get("/:id", pratosController.show);
pratosRoutes.delete("/:id", pratosController.delete);

module.exports = pratosRoutes;
