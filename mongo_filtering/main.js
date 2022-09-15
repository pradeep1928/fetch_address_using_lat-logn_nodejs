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

  insertDb
    .countDocuments()
    .then((doc_counts) => {
      console.log("count of Documents inserted --> ", doc_counts);
    })
    .catch((err) => {
      console.log(err);
    });
};

const main = async () => {
  const dbInstance = await connectDB();
  const insertDb = dbInstance.db("insertdb").collection("collection");
  const findDb = dbInstance.db("msgdb").collection("msgcoll");
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
      }
    });
};

main();
