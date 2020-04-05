const logger = require("../../services/logger.service");
const feedService = require("./feed.service");

// TODO: needs error handling! try, catch

async function getFeeds(req, res) {
  try {
    const feeds = await feedService.query(req.query);
    res.json(feeds);
  } catch (err) {
    logger.error("Cannot get feeds", err);
    res.status(500).send({ error: "cannot get feeds" });
  }
}
async function getByUserId() {
  try {
    const feeds = await feedService.getTotalByGuideId(req.params.id);
    res.json(feeds);
  } catch (err) {
    logger.error("Cannot get feeds", err);
    res.status(500).send({ error: "cannot get feeds" });
  }
}

async function deleteFeed(req, res) {
  await feedService.remove(req.params.id);
  res.end();
}

async function addFeed(req, res) {
  var feed = req.body;
  feed = await feedService.add(feed);

  feed.byUser = req.session.user;
  // TODO - need to find aboutUser
  res.send(feed);
}

module.exports = {
  getFeeds,
  deleteFeed,
  addFeed
};
