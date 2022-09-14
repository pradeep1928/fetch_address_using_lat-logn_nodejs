const MongoClient = require("mongodb").MongoClient;
const encrypt = require("./encryptDecrypt");
const userdata = require("./data");
const encrypedData = new encrypt();

// var mongoDBUrl = "mongodb://127.0.0.1/encrypedData";
var mongoDBUrl2 = "mongodb://127.0.0.1/msgdb";

MongoClient.connect(mongoDBUrl2, function (err, db) {
  if (err) {
    throw err;
  }
  console.log("Successfully connected to Mongodb");
  const insertDb = db.db("insertdb").collection("collection");
  const findDb = db.db("msgdb").collection("msgcoll");
  // inserttoDb(findDb, userdata);
  let bigarr = [];
  let stream = findDb.find().stream();
  stream
    .on("data", (data) => {
      data.mobile = data.mobile.toString();
      data.mobile = encrypedData.encryptData(data.mobile);
      data.msg = encrypedData.encryptData(data.msg);
      bigarr.push(data);
      if (bigarr.length == 5) {
        inserttoDb(insertDb, bigarr);
        bigarr = [];
      }
    })
    .on("end", () => {
      inserttoDb(insertDb, bigarr);
      // console.log("last bigarr", bigarr);
    });
});

const inserttoDb = (insertDb, bigarr) => {
  insertDb.insertMany(bigarr, function (err, items) {
    if (err) {
      console.log(err);
    }
    console.log("this is items", items);
  });
};
