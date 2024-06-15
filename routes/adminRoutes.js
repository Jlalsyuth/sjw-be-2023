const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

router.post("/login", authenticateAdmin, adminController.login);
router.get("/profile", authenticateAdmin, adminController.showProfile);

module.exports = router;
