const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const layananController = require("../controllers/layananController");

router.post(
    "/ultksp",
    authMiddleware.authenticate,
    layananController.createLayananULTKSP
);
router.post(
    "/konseling",
    authMiddleware.authenticate,
    layananController.createLayananKonseling
);
router.post(
    "/konselingsebaya",
    authMiddleware.authenticate,
    layananController.createLayananKonselingSebaya
);
router.get(
    "/ultksp/history",
    authMiddleware.authenticate,
    layananController.getULTKSPLayananHistory
);
router.get(
    "/konseling/history",
    authMiddleware.authenticate,
    layananController.getKonselingLayananHistory
);
router.get(
    "/konselingsebaya/history",
    authMiddleware.authenticate,
    layananController.getKonselingSebayaLayananHistory
);
router.get(
    "/ultksp/all-history",
    authMiddleware.authenticateAdmin,
    layananController.getAllULTKSPLayananHistory
);
router.get(
    "/konseling/all-history",
    authMiddleware.authenticateAdmin,
    layananController.getAllKonselingLayananHistory
);
router.get(
    "/konselingsebaya/all-history",
    authMiddleware.authenticateAdmin,
    layananController.getAllKonselingSebayaLayananHistory
);
router.put(
    "/ultksp/:id",
    authMiddleware.authenticateAdmin,
    layananController.updateULTKSPLayanan
);
router.put(
    "/konseling/:id",
    authMiddleware.authenticateAdmin,
    layananController.updateKonselingLayanan
);
router.put(
    "/konselingsebaya/:id",
    authMiddleware.authenticateAdmin,
    layananController.updateKonselingSebayaLayanan
);
router.delete(
    "/ultksp/:id",
    authMiddleware.authenticateAdmin,
    layananController.deleteULTKSPLayanan
);
router.delete(
    "/konseling/:id",
    authMiddleware.authenticateAdmin,
    layananController.deleteKonselingLayanan
);
router.delete(
    "/konselingsebaya/:id",
    authMiddleware.authenticateAdmin,
    layananController.deleteKonselingSebayaLayanan
);


module.exports = router;
