const UserModel = require("../models/userModel");
const { signUpErrors } = require("../utils/errorUtils");
module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    await UserModel.create({ email, password });

    res.status(201).json({ message: "inscription reussi" });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};
