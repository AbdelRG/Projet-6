const router = require("express").Router();
const sauceController = require("../controllers/sauceController");
const { authenticateToken } = require("../middleware/authMiddleware");

const multerMiddleware = require("../middleware/multerMiddleware");

router.post(
  "/sauces",
  authenticateToken,
  multerMiddleware,
  sauceController.setSauce
);

router.get("/sauces", authenticateToken, sauceController.getAllSauces);
router.get("/sauces/:id", authenticateToken, sauceController.getSauceById);
router.put("/sauces/:_id", authenticateToken,multerMiddleware, sauceController.updateSauce);
router.delete("/sauces/:_id", authenticateToken, sauceController.deleteSauce);
module.exports = router;
