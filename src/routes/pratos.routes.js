const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const PratosController = require("../controllers/PratosController");
const ensureAuthenticatedAdmin = require("../middlewares/ensureAuthenticatedAdmin");

const pratosController = new PratosController();

const pratosRoutes = Router();
const upload = multer(uploadConfig.MULTER);

pratosRoutes.get("/", pratosController.index);
pratosRoutes.post(
  "/",
  ensureAuthenticatedAdmin,
  upload.single("avatar"),
  pratosController.create
);
pratosRoutes.get("/:id", pratosController.show);
pratosRoutes.delete("/:id", ensureAuthenticatedAdmin, pratosController.delete);

module.exports = pratosRoutes;
