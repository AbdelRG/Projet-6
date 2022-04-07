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
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  console.log(req.body);
  const { name, manufacturer, description, mainPepper, heat } = req.body;
  //const imageUrl = req.file.path;
  try {
    await sauceModel.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        heat: heat,
        //imageUrl: imageUrl,
      },
      (err, data) => {
        if (err) res.status(400).send(err);
        else res.status(201).json({ message: "sauce mis a jour" });
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.deleteSauce = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  try {
    await sauceModel.deleteOne(req.params.id, function (err) {
      if (!err) res.status(201).json({ message: "sauce supprimer" });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
