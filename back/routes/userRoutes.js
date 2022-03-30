const router = require("express").Router();
const authController = require("../controllers/authController.js");

//auth
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
