const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const AdminAvatarController = require("../controllers/AdminAvatarController");
const AdminController = require("../controllers/AdminController");
const ensureAuthenticatedAdmin = require("../middlewares/ensureAuthenticatedAdmin");

const adminController = new AdminController();
const adminAvatarController = new AdminAvatarController();

const upload = multer(uploadConfig.MULTER);

const adminRoutes = Router();

adminRoutes.post("/", adminController.create); //passar ensure?
adminRoutes.put("/", ensureAuthenticatedAdmin, adminController.update);
adminRoutes.patch(
  "/avatar",
  ensureAuthenticatedAdmin,
  upload.single("avatar"),
  adminAvatarController.update
);

module.exports = adminRoutes;
