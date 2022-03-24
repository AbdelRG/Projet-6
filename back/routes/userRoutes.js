const router = require("express").Router();
const authController = require("../controllers/authController.js");

//auth
router.post("/signup", authController.signUp);

module.exports = router;
