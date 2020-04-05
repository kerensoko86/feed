const express = require("express");
const {
  requireAuth,
  requireAdmin
} = require("../../middlewares/requireAuth.middleware");
const {
  addFeed,
  getFeeds,
  deleteFeed,
  getByUserId
} = require("./feed.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getFeeds);
router.post("/", addFeed);
router.delete("/:id", deleteFeed);

module.exports = router;
