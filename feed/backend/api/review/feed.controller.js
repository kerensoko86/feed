const logger = require("../../services/logger.service");
const Feedervice = require("./feed.service");

// TODO: needs error handling! try, catch

async function getFeed(req, res) {
  try {
    const Feed = await Feedervice.query(req.query);
    res.json(Feed);
  } catch (err) {
    logger.error("Cannot get Feed", err);
    res.status(500).send({ error: "cannot get Feed" });
  }
}
async function getByUserId() {
  try {
    const Feed = await Feedervice.getTotalByGuideId(req.params.id);
    res.json(Feed);
  } catch (err) {
    logger.error("Cannot get Feed", err);
    res.status(500).send({ error: "cannot get Feed" });
  }
}

async function deleteReview(req, res) {
  await Feedervice.remove(req.params.id);
  res.end();
}

async function addReview(req, res) {
  var review = req.body;
  review = await Feedervice.add(review);

  review.byUser = req.session.user;
  // TODO - need to find aboutUser
  res.send(review);
}

module.exports = {
  getFeed,
  deleteReview,
  addReview
};
