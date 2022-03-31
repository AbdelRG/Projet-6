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
module.exports = router;
