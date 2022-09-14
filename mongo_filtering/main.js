const MongoClient = require("mongodb").MongoClient;
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
    // console.log("this is items", items);
  });
};

// const insertOnebyOne = (insertDb, bigarr) => {
//   insertDb.insert(bigarr, function (err, items) {
//     if (err) {
//       console.log(err);
//     }
//     // console.log("this is items", items);
//   });
// };


const main = async () => {
  const dbInstance = await connectDB();
  const insertDb = dbInstance.db("insertdb").collection("collection");
  const findDb = dbInstance.db("msgdb").collection("msgcoll");
  // console.time("inserting");
  // inserttoDb(findDb, userdata);
  // console.timeEnd("inserting")
  let bigarr = [];
  let stream = findDb.find().stream();
  stream
    .on("data", (data) => {
      data.mobile = data.mobile.toString();
      data.mobile = encrypedData.encryptData(data.mobile);
      data.msg = encrypedData.encryptData(data.msg);
      bigarr.push(data);
      if (bigarr.length == 20000) {
        console.time("inserting");
        inserttoDb(insertDb, bigarr);
        console.log("length of the array >>>.", bigarr.length);
        bigarr = [];
        console.timeEnd("inserting");
      }
    })
    .on("end", () => {
      if (bigarr.length) {
        console.time("ending");
        inserttoDb(insertDb, bigarr);
        console.log("length of the array at ending >>>.", bigarr.length);
        console.timeEnd("ending");
      }
      // console.log("last bigarr", bigarr);
    });
};


main();
