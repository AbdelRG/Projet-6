const sauceModel = require("../models/sauceModel");

const { json } = require("express");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.like = async (req, res) => {
  const userId = req.body.userId;

  const like = req.body.like;
  const _id = req.params._id;
  if (!ObjectID.isValid(_id)) return res.status(400).send("ID unknown :" + _id);
  const sauce = await sauceModel.findById(_id);

  if (like == 1 && !sauce.usersLiked.includes(userId)) {
    sauce.usersLiked.push(userId);
    sauce.likes++;
    if (sauce.usersDisliked.includes(userId)) {
      sauce.dislikes = sauce.dislikes - 1;
      sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
    }
    sauce.save();

    res.status(200).json({ message: "sauce like" });
  }

  if (like == -1 && !sauce.usersDisliked.includes(userId)) {
    sauce.usersDisliked.push(userId);

    sauce.dislikes++;

    if (sauce.usersLiked.includes(userId)) {
      sauce.likes = sauce.likes - 1;
      sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
    }
    sauce.save();
    res.status(200).json({ message: "sauce dislike" });
  }
  if (like == 0) {
    if (sauce.usersDisliked.includes(userId)) {
      sauce.dislikes = sauce.dislikes - 1;
      sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
      sauce.save();
      res.status(200).json({ message: " dislike retirer" });
    }
    if (sauce.usersLiked.includes(userId)) {
      sauce.likes = sauce.likes - 1;
      sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
      sauce.save();
      res.status(200).json({ message: " like retirer" });
    }
  }
};
