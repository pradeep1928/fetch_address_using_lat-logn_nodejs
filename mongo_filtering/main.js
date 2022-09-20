const MongoClient = require("mongodb").MongoClient;
const moment = require("moment");
const { performance } = require("perf_hooks");
const encrypt = require("./encryptDecrypt");
const userdata = require("./data");
const encrypedData = new encrypt();

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

const inserttoDb = (insertDb, bigarr) => {
  insertDb.insertMany(bigarr, function (err, items) {
    if (err) {
      console.log(err);
    }
    console.log("chunk inserted");
  });
};

// const findCount = async (insertDb) => {
//   let countOfDocs = await insertDb.countDocuments();
//   console.log("count of Documents inserted --> ", countOfDocs);
//   return countOfDocs;
// };

const main = async () => {
  let getdate = moment("20220521").format("YYYYMMDD");
  let lastdate = moment("20220523").format("YYYYMMDD");
  let endDate = moment("20220523", "YYYYMMDD");
  let dayDifference = endDate.diff(getdate, "days");
  console.log("--firstdate--", getdate);
  console.log("--lastdate--", endDate);
  console.log("-------difference in dates--------", dayDifference);
  const dbInstance = await connectDB();
    for (let i = 0; i <= dayDifference; i++) {
      const insertDb = dbInstance
        .db(`vivasmpp_${getdate}_encrypted`)
        .collection("collection");
      const findDb = dbInstance.db(`vivasmpp_${getdate}`).collection("msgcoll");
      // inserttoDb(findDb, userdata);
      let bigarr = [];
      let stream = findDb.find().stream();
      stream
        .on("data", (data) => {
          data.mobile = data.mobile.toString();
          data.mobile = encrypedData.encryptData(data.mobile);
          data.msg = encrypedData.encryptData(data.msg);
          bigarr.push(data);
          if (bigarr.length == 20000) {
            inserttoDb(insertDb, bigarr);
            bigarr = [];
          }
        })
        .on("end", () => {
          if (bigarr.length) {
            inserttoDb(insertDb, bigarr);
            console.log("----ending----")

          }
        });
      getdate = moment(getdate).add(1, "days").format("YYYYMMDD");
    }
};

main();


// let date1 = moment("20220521");
// let date2 = moment("20220523")
// console.log(`date1 is ${date1}, date2 is ${date2}`)

// if (date2 > date1) {
//   console.log("lesser")
// } else {
//   console.log("bigger")
// }

// let start = performance.now()
// for (let i = 0; i< 10000000; i++) {}
// let end = performance.now()
// console.log(`execution time: ${end - start} ms`)
