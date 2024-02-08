const mongodb = require("mongodb"); // mongo client library
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "enterprise";
const collection_name = "employees";
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  var db = client.db(dbName);
  collection = db.collection(collection_name);
}
startup();

// retrieve Employee information by name
module.exports.findEmployeeByName = function (name, callback) {
  let dataPromise = collection.findOne({ name: name });
  dataPromise.then((employee) => callback(employee));
};

// retrieve Employee information by Username
module.exports.findEmployeeByUsername = function (username, callback) {
  let dataPromise = collection.findOne({ username: username });
  dataPromise.then((employee) => callback(employee));
};