const { Router } = require("express");

const AdminController = require("../controllers/AdminController");

const adminController = new AdminController();

const adminRoutes = Router();

adminRoutes.post("/", adminController.create);

module.exports = adminRoutes;
