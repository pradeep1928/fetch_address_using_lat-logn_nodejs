const MongoClient = require("mongodb").MongoClient;
const { performance } = require("perf_hooks");
const moment = require("moment");
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

  // insertDb
  //   .countDocuments()
  //   .then((doc_counts) => {
  //     console.log("count of Documents inserted --> ", doc_counts);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const findCount = async (insertDb) => {
  let countOfDocs = await insertDb.countDocuments();
  console.log("count of Documents inserted --> ", countOfDocs);
};

const main = async () => {
  let getDate =  moment("20220521").format("YYYYMMDD");
  console.log("---getdate---", getDate)
  const dbInstance = await connectDB();
  const insertDb = dbInstance.db(`vivasmpp_${getDate}_encrypted`).collection("collection");
  const findDb = dbInstance.db(`vivasmpp_${getDate}`).collection("msgcoll");
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
        findCount(insertDb);
        bigarr = [];
      }
    })
    .on("end", () => {
      if (bigarr.length) {
        inserttoDb(insertDb, bigarr);
        findCount(insertDb);
        console.log("-----end of process-----");
      }
    });
    getDate = moment(getDate).add(1, 'days').format("YYYYMMDD")
    console.log("---nextDate---", getDate)  
};



 main();


