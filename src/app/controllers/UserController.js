const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" });
    }

    return res
      .status(201)
      .json(await User.create(req.body));
  }
};
