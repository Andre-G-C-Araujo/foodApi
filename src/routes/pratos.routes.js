const { Router } = require("express");

const PratosController = require("../controllers/PratosController");

const pratosController = new PratosController();

const pratosRoutes = Router();

pratosRoutes.get("/", pratosController.index);
pratosRoutes.post("/:admin_id", pratosController.create);
pratosRoutes.get("/:id", pratosController.show);
pratosRoutes.delete("/:id", pratosController.delete);

module.exports = pratosRoutes;
