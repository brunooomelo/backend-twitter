const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { name, password } = req.body;
    const user = await User.findOne({ name }).select(['password', 'name', 'email', 'createdAt'])

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if(!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    user.password = undefined

    return res.json({ user, token: User.generateToken(user) })
  }
};
