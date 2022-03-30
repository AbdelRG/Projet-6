const sauceModel = require("../models/sauceModel");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/authMiddleware.js");

module.exports.setSauce = async (req, res) => {
  const { name, manufacturer, description, mainPepper, imageUrl, heat } =
    req.body;
  const user = authenticateToken();
  userId = user._id;
  try {
    await sauceModel.create({
      userId,
      name,
      manufacturer,
      description,
      mainPepper,
      imageUrl,
      heat,
    });

    res.status(201).json({ message: "inscription reussi" });
  } catch (err) {}
};
