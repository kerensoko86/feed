const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

const COLLECTION_NAME = "feed";

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  // console.log(filterBy);
  console.log(criteria);
  const collection = await dbService.getCollection(COLLECTION_NAME);
  try {
    var feeds = await collection
      .aggregate([
        {
          $match: criteria
        }
      ])
      .toArray();
    // var feedsWithUsers = await collection
    //   .aggregate([
    //     {
    //       $match: criteria
    //     },
    //     {
    //       $lookup: {
    //         from: "user",
    //         localField: "userId",
    //         foreignField: "_id",
    //         as: "by"
    //       }
    //     },
    //     {
    //       $unwind: "$by"
    //     },
    //     {
    //       $project: {
    //         userId: false,
    //         "by.password": false,
    //         "by.isAdmin": false,
    //         "by.tourId": false,
    //         "by.email": false,
    //         "by.languages": false,
    //         "by.bio": false
    //       }
    //     }
    //   ])
    //   .toArray();
    console.log(feeds);
    let sum = 0;
    const feedsToReturn = await Promise.all(
      feeds.map(async feed => {
        sum += feed.rating;
        if (feed.userId) {
          const userCollection = await dbService.getCollection("user");
          try {
            const user = await userCollection.findOne({
              _id: ObjectId(feed.userId)
            });
            if (user != null) {
              feed.by = {
                _id: user._id,
                lastName: user.lastName,
                firstName: user.firstName,
                createdAt: user.createdAt,
                userImgUrl: user.userImgUrl
              };
            } else {
              feed.by = {
                firstName: feed.name
              };
            }
            console.log(user);
          } catch (err) {
            console.log(err);
          }
        } else if (feed.userId === null) {
          feed.by = {
            firstName: feed.name
          };
        }
        return feed;
      })
    );
    console.log("feedToReturn", feedsToReturn);
    return {
      feeds: feedsToReturn,
      avg: (sum / feeds.length).toFixed(1),
      total: feeds.length
    };
  } catch (err) {
    console.log("ERROR: cannot find feeds");
    throw err;
  }
}

async function remove(feedId) {
  const collection = await dbService.getCollection(COLLECTION_NAME);
  try {
    await collection.deleteOne({ _id: ObjectId(feedId) });
  } catch (err) {
    console.log(`ERROR: cannot remove feed ${feedId}`);
    throw err;
  }
}

async function add(feed) {
  if (feed.userId) {
    feed.userId = ObjectId(feed.userId);
  }
  feed.tourGuideId = ObjectId(feed.tourGuideId);
  feed.createdAt = Date.now();
  const collection = await dbService.getCollection(COLLECTION_NAME);
  try {
    await collection.insertOne(feed);
    return feed;
  } catch (err) {
    console.log(`ERROR: cannot insert user`);
    throw err;
  }
}

async function getTotalByGuideId(guideId) {
  const collection = await dbService.getCollection(COLLECTION_NAME);
  try {
    var feeds = await collection
      .aggregate([
        {
          $match: {
            tourGuideId: ObjectId(guideId)
          }
        }
      ])
      .toArray();

    let sum = 0;
    feeds.map(feed => {
      if (typeof feed.rating === "number") sum += feed.rating;
    });
    let avg = sum / feeds.length;
    if (!avg) {
      avg = 0;
    }
    return {
      total: feeds.length,
      avg: avg.toFixed(1)
    };
  } catch (error) {
    throw error;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};
  if (filterBy.userId) {
    criteria.userId = ObjectId(filterBy.userId);
  }
  if (filterBy.tourGuideId) {
    criteria.tourGuideId = ObjectId(filterBy.tourGuideId);
  }
  return criteria;
}

module.exports = {
  query,
  remove,
  add,
  getTotalByGuideId
};
