const sauceModel = require("../models/sauceModel");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.setSauce = async (req, res) => {
  const sauce = JSON.parse(req.body.sauce);
  const { name, manufacturer, description, mainPepper, heat } = sauce;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    userId = user.id;
  });
  const imageUrl = "http://localhost:3000/" + req.file.path;

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
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

module.exports.getAllSauces = async (req, res) => {
  const sauces = await sauceModel.find();

  res.status(200).send(sauces);
};

module.exports.getSauceById = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  sauceModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown :" + err);
  });
};

module.exports.updateSauce = async (req, res) => {
  const _id = req.params._id;
  if (!ObjectID.isValid(_id)) return res.status(400).send("ID unknown :" + _id);
  if (req.file == null) {
    const { name, manufacturer, description, mainPepper, heat } = req.body;

    try {
      await sauceModel.findOneAndUpdate(
        { _id },
        {
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          heat: heat,
        }
      );
      res.status(201).json({ message: "sauce mis a jour" });
    } catch (err) {
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  } else {
    const imageUrl = "http://localhost:3000/" + req.file.path;
    const sauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper, heat } = sauce;
    try {
      await sauceModel.findOneAndUpdate(
        { _id },
        {
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          heat: heat,
          imageUrl: imageUrl,
        }
      );
      res.status(201).json({ message: "sauce mis a jour" });
    } catch (err) {
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
};

module.exports.deleteSauce = async (req, res) => {
  const _id = req.params._id;
  if (!ObjectID.isValid(_id)) return res.status(400).send("ID unknown :" + _id);
  try {
    await sauceModel.deleteOne({ _id });
    res.status(204).json({ message: "sauce supprimer" });
  } catch (err) {
    console.log(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
