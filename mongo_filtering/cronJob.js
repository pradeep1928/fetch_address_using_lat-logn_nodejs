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

// function insertIntoDb(dbname) {
//   dbname.insertMany(cronData, function (err, result) {
//     if (err) {
//       console.log("------error in inserting", err);
//     }
//     console.log("data inserted successfully", result);
//   });
// }

let apiDataObj = {
  access_token:
    "EAAHZBJuUXZB9sBAFTXDNCZCqJ4Jas2rMZClwooZAOWCek8Tiu32cb8Q90xOSDQnUQWDIULoapZCZBM4DdXqkPfTM0d0HbZBQAgIgCHZCZA4Iajx3Wp0UuP3ZAw3KEOBpB0HEYyuNNUd1BJBhNJK3L18gCnbcQdg93TNTvu9uVBvvt8EooylUP5Q3ftK",
  token_type: "bearer",
  expires_in: 4402870,
};

function secondsToDays(seconds) {
  seconds = Number(seconds);
  var days = Math.floor(seconds / (3600 * 24));
  return days;
}

const main = async () => {
  const dbInstance = await connectDB();
  const findAndUpdateDb = dbInstance.db("crondb").collection("croncoll");
  // insertIntoDb(findAndUpdateDb)
  const foundData = findAndUpdateDb.find();
  foundData.forEach((element) => {
    let today = moment().format("YYYY-MM-DD");
    let date = element.expiry_date;
    let tomorrow = moment(date, "YYYY-MM-DD");
    let dayDifference = tomorrow.diff(today, "days");
    console.log("-------difference in dates--------", dayDifference);
    if (dayDifference <= 1) {
      let days_to_add = secondsToDays(apiDataObj.expires_in);
      let api_access_token = apiDataObj.access_token;
      let newDate = moment(element.expiry_date)
        .add(days_to_add, "days")
        .format("YYYY-MM-DD");
      findAndUpdateDb.updateOne(
        { username: element.username },
        { $set: { expiry_date: newDate, access_token: api_access_token } },
        { upsert: true },
        function (err, result) {
          if (err) {
            console.log("------error in updating-----------", err);
          }
          console.log("updation done. added days", days_to_add);
        }
      );
    }
  });
};

main();

// let today = moment().format("YYYY-MM-DD")
// let date = "2022-09-16"
// let tommorow = moment(date, "YYYY-MM-DD");
// let diffdays = tommorow.diff(today, 'days')

// var a = moment(today);
// var b = moment(tommorow);

// console.log("-------day difference-------", diffdays)

// if ((tommorow - today) <= 1) {
//   console.log("access token is set")
// }

// console.log("----today------", today)
// console.log("----tommorow------", tommorow)
