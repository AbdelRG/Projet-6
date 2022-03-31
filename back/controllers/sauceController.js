const sauceModel = require("../models/sauceModel");
const jwt = require("jsonwebtoken");

module.exports.setSauce = async (req, res) => {
  console.log("test");
  const { name, manufacturer, description, mainPepper, heat } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    userId = user.id;
  });
  const imageUrl = req.file.path;

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

    res.status(201).json({ message: "sauce upload" });
  } catch (err) {
    res.status(400).send(err);
  }
};
