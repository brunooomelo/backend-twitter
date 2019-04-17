const Tweet = require("../models/Tweet");

module.exports = {
  async index(req, res) {
    const tweets = await Tweet.find({})
      .sort("-createdAt")
      .populate({
        path: "author",
        model: "User",
        select: ["name"]
      });

    return res.json(tweets);
  },

  async store(req, res) {
    const author = req.userId;
    const tweet = await Tweet.create({ author, ...req.body });
    const socket = await Tweet.find({ _id: tweet._id }).populate({
      path: "author",
      model: "User",
      select: ["name"]
    });
    req.io.emit("tweet", socket[0]);

    return res.json(tweet);
  }
};
