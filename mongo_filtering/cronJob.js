const MongoClient = require("mongodb").MongoClient;
const moment = require("moment");

const cronData = require("./crondata");

const connectDB = async () => {
  var mongoDBUrl2 = "mongodb://127.0.0.1/";
  let db = null;
  try {
    db = await MongoClient.connect(mongoDBUrl2);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("error in connection");
  }
  return db;
};

function insertIntoDb(dbname) {
  dbname.insertMany(cronData, function (err, result) {
    if (err) {
      console.log("------error in inserting", err);
    }
    console.log("data inserted successfully", result);
  });
}

let apiDataObj = {
  access_token:
    "EAAHZBJuUXZB9sBAFTXDNCZCqJ4Jas2rMZClwooZAOWCek8Tiu32cb8Q90xOSDQnUQWDIULoapZCZBM4DdXqkPfTM0d0HbZBQAgIgCHZCZA4Iajx3Wp0UuP3ZAw3KEOBpB0HEYyuNNUd1BJBhNJK3L18gCnbcQdg93TNTvu9uVBvvt8EooylUP5Q3ftK",
  token_type: "bearer",
  expires_in: 4402870,
};

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var days = Math.floor(seconds / (3600 * 24));
  return days;
}



const main = async () => {
  const dbInstance = await connectDB();
  const findAndUpdateDb = dbInstance.db("crondb").collection("croncoll");
  //   insertIntoDb(findAndUpdateDb)
  const foundData = findAndUpdateDb.find();
  foundData.forEach((element) => {
    let days_to_add = secondsToDhms(apiDataObj.expires_in);
    let api_access_token = apiDataObj.access_token;
    let newDate = moment(element.expiry_date)
      .add(days_to_add, "days")
      .format("YYYY-MM-DD");
    findAndUpdateDb.findOneAndUpdate(
      { username: element.username },
      { $set: { expiry_date: newDate, access_token: api_access_token } },
      function (err, result) {
        if (err) {
          console.log("------error in updating-----------", err);
        }
        console.log("updation done");
      }
    );
  });
};

main();
