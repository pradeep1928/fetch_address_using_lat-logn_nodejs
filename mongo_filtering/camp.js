const moment = require("moment");

var MongoClient = require("mongodb").MongoClient;

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

let max = 5;
let min = 1;

function oneToNine() {
  return Math.floor(Math.random() * 10);
}

function oneToFive() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let grabTheValue = oneToFive();

function lessThanOneToFive() {
  return Math.floor(Math.random() * (grabTheValue - min + 1) + min);
}

function randomString(length) {
  var characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomString = "";
  for (var i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

let isodate = new Date().toISOString();
let formatedDate = Date.now();

// let randomdata = () => {
//   let isodate = new Date().toISOString();
//   let formatedDate = Date.now();
//   const arr1 = [];
//   for (let i = 0; i < 6; i++) {
//     arr1.push({
//      updateOne: {
//       update:{ $set: {
//         camp_name: `${randomString(8)}${formatedDate}`,
//         contacts_uploaded: parseInt(`${oneToFive()}`),
//         unique_contact_processed: parseInt(`${lessThanOneToFive()}`),
//         campaign_status: parseInt(`${oneToNine()}`),
//         created_time: isodate,
//       }},
//       upsert: true
//     }
//     })
//   }
//   // const updateDoc = {
//   //   $set: {
//   //     camp_name: `${randomString(8)}${formatedDate}`,
//   //     contacts_uploaded: parseInt(`${oneToFive()}`),
//   //     unique_contact_processed: parseInt(`${lessThanOneToFive()}`),
//   //     campaign_status: parseInt(`${oneToNine()}`),
//   //     created_time: isodate,
//   //   },
//   // };
//   return arr1;
// };

// let arrData = randomdata();
// console.log("..................", arrData)

// const updateManyDocs = async (updatedb) => {
//   let updateDocs = randomdata();

//   console.log("updateDocs-------", updateDocs[0].updateOne);
//   // options = {
//   //   upsert: true,
//   // };

//   updatedb.bulkWrite(updateDocs, function (err, items) {
//     if (err) {
//       console.log(err);
//     }
//     console.log("this is items >>>>>", items);
//   });
// };

const main = async () => {
  const dbInstance = await connectDB();
  const updateDb = dbInstance.db("shortmsgdb").collection("shortmsgcoll");
  let dataCount = await updateDb.estimatedDocumentCount();
  // console.log("count of documents", dataCount);
  let dataArr = []
  let dataToSet = {
    camp_name: `${randomString(8)}${formatedDate}`,
    contacts_uploaded: parseInt(`${oneToFive()}`),
    unique_contact_processed: parseInt(`${lessThanOneToFive()}`),
    campaign_status: parseInt(`${oneToNine()}`),
    created_time: isodate,
  };

  for(let i = 0; i < dataCount; i++) {
    dataArr.push(dataToSet)
  }

  console.log("--------dataArr-----------", dataArr)

  let Bulkdata = updateDb.initializeUnorderedBulkOp();
  dataArr.forEach((element) => {
    console.log("-----------element----------", element)
    Bulkdata.find({
      camp_name: element["camp_name"],
      contacts_uploaded: element["contacts_uploaded"],
      unique_contact_processed: element["unique_contact_processed"],
      campaign_status: element["campaign_status"],
      created_time: element["created_time"],
    })
      .upsert()
      .updateOne({$set: {element}});
  });
  // Bulkdata.execute(function (err, result) {
  //   if (err) {
  //     console.log("error in bulkwrite----------", err);
  //   }
  //   console.log("----------result---------", result)
  // });

  // updateManyDocs(updateDb);

  // try{
  //   updateDb.bulkWrite([
  //     {
  //       updateMany: {
  //         filter: { account_type: "trans" },
  //         update: {
  //           $set: {
  //             camp_name: `${randomString(8)}${formatedDate}`,
  //             contacts_uploaded: parseInt(`${oneToFive()}`),
  //             unique_contact_processed: parseInt(`${lessThanOneToFive()}`),
  //             campaign_status: parseInt(`${oneToNine()}`),
  //             created_time: isodate,
  //           },
  //         },
  //         upsert: true,
  //       },
  //     },
  //   ]);
  // } catch (error) {
  //   console.log(error)
  // }
};

main();

let randomStrArr = [];
for (let i = 10; i < 4; i++) {
  randomStrArr.push(randomString(10));
}

// const uniquArr = Array.from(new Set(randArr));

// if (randArr.length === uniquArr.length) {
//   console.log(`Array doesn't contain duplicates.`);
// } else {
//   console.log(`Array contains duplicates.`);
// }

let date = Date.now();
console.log(date);
console.log(">>>>>>>>>>>>>..");
