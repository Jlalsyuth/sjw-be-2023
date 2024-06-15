const express = require("express");
const faqController = require("../controllers/faqController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware.authenticate, faqController.createFaq);
router.get(
    "/faqs/user",
    authMiddleware.authenticate,
    faqController.getFaqsByUser
);
router.get("/", authMiddleware.authenticateAdmin, faqController.getAllFaqs);
router.delete(
    "/:id",
    authMiddleware.authenticateAdmin,
    faqController.deleteFaq
);
router.put(
    "/:id/status",
    authMiddleware.authenticateAdmin,
    faqController.updateFaqStatus 
);

module.exports = router;
