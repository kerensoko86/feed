const MongoClient = require("mongodb").MongoClient;

const config = require("../config");

module.exports = {
  getCollection
};

// Database Name
<<<<<<< HEAD:backend/services/db.service.js
const dbName = "Feed_DB";
=======
const dbName = "FEED_DB";
>>>>>>> ba13160a0a21a03ec89482565b1d2f8b8e4e6cfd:feed/backend/services/db.service.js

var dbConn = null;

async function getCollection(collectionName) {
  const db = await connect();
  return db.collection(collectionName);
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true, useUnifiedTopology: true
    });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}
