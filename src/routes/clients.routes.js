const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ClientsController = require("../controllers/ClientsController");
const ClientsFavController = require("../controllers/ClientsFavController");
const ClientAvatarController = require("../controllers/ClientAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const clientsController = new ClientsController();
const clientsFavController = new ClientsFavController();
const clientAvatarController = new ClientAvatarController();

const clientsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

clientsRoutes.post("/", clientsController.create);
clientsRoutes.put("/", ensureAuthenticated, clientsController.update);
clientsRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  clientAvatarController.update
);
clientsRoutes.patch(
  "/favorites",
  ensureAuthenticated,
  clientsFavController.saveFav
);

module.exports = clientsRoutes;
