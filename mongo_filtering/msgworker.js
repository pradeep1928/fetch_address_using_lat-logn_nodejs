var mysql = require("mysql");
const express = require("express")
const request = require('request')
const port = 3003;
const app = express();
app.use(express.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "pradeep19",
  password: "Pradeep@1910M",
  database: "mis_report",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// con.query("CREATE DATABASE smsdb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//     });

let createTable =
  "CREATE TABLE IF NOT EXISTS table_1 (Username VARCHAR(255), SMSCNAME varchar(255), TOTAL int(10), DELIVRD int(10), DELIVRDPer float, SMSC float, SMSCPer float, EXPIRED int(8), Other int(10), OtherPer float, DND float, WrongSender float, VendorError float)";

con.query(createTable, function (err, result) {
  if (err) throw err;
  console.log("created table table_1");
});

let messages = [
  ["jk_upism", "AIR_SKV_TA2_NM_T", 241596, 233408, 96.61, 3815, 1.58, 456, 7732, 3.20, 0, 0, 0],
  ["MNSPJL", "JI_BAN_NST3_NM_K_T", 603, 529, 87.73, 10, 1.66, 36, 38, 6.30, 0, 0, 0],
  ["KVNSPM", "JI_BAN_NST3_NM_K_T", 228, 171, 75.00, 21, 9.21, 4, 53, 23.25, 0, 0, 0],
  ["yesbk_sms_new", "MON_INTL_NM_K_T", 219, 44, 20.09, 38, 17.35, 0, 175, 79.91, 0, 0, 0],
  ["roots", "JI_BAN_NST3_NM_K_T", 467, 262, 56.10, 12, 2.57, 0, 205, 43.90, 0, 0, 0],
  ["OTP_RilSmart",	"JI_BAN_NSOTP2_NM_K_T",	187129,	168869,	90.24,	343,	0.18,	6836,	11424,	6.10, 0,	0,	0],
  ["RailTel_IRHMIS",	"AIR_SKV_TA1_NM_T",	54450,	12254,	22.51,	1041,	1.91,	2,	42194,	77.49,	0,	0,	0],
  ["rel_live",	"JI_DL_NSOTP1_NM_K_T",	51910,	47685,	91.86,	238,	0.46,	2984,	1241,	2.39,	0,	0,	0,],
  ["SUDNSP",	"JI_DL_NST3_NM_K_T",	155,	142,	91.61,	11,	7.10,	0,	13,	8.39,	0,	0,	0],
  ["PSSBNK",	"JI_DL_NSOTP1_NM_K_T",	169,	142,	84.02,	0,	0.00,	21,	6,	3.55,	0,	0,	0],
  ["JAGDAM",	"JI_BAN_NST3_NM_K_T",	176,	161,	91.48,	6,	3.41,	0,	15,	8.52,	0,	0,	0],
  ["GOMTES",	"JI_BAN_NST3_NM_K_T",	176,	150,	85.23,	11,	6.25,	0,	26,	14.77,	0,	0,	0],
  ["VMNSPW",	"JI_DL_NST3_NM_K_T",	176,	145,	82.39,	22,	12.50,	2, 29,	16.48,	0,	0,	0],
  ["SHIVML",	"JI_DL_NST3_NM_K_T",	177,	167,	94.35,	10,	5.65,	0,	10,	5.65,	0,	0,	0],
  ["DHYMNL",	"JI_BAN_NST3_NM_K_T",	179,	166,	92.74,	9, 5.03,	0,	13,	7.26,	0,	0,	0],
  ["PPLBNK",	"JI_BAN_NST3_NM_K_T",	180,	164,	91.11,	7,	3.89,	1,	15,	8.33,	0,	0,	0],
  ["jk_contcentre",	"AIR_SKV_TA2_NM_T",	182,	153,	84.07,	23,	12.64,	0,	29,	15.93,	0,	0,	0],
  ["shriram_gen",	"JI_DL_NST3_NM_K_T",	183,	172,	93.99,	5,	2.73,	0,	11,	6.01,	0,	0,	0],
  ["sms_tlg",	"JI_DL_NST3_NM_K_T",	183,	178,	97.27,	5,	2.73,	0,	5,	2.73,	0,	0,	0],
  ["MNSPBA",	"JI_BAN_NST3_NM_K_T",	210,	195,	92.86,	12,	5.71,	0,	15,	7.14,	0,	0,	0],
  ["SMPPAN",	"JI_DL_NST3_NM_K_T",	210,	196,	93.33,	14,	6.67,	0,	14,	6.67,	0,	0,	0],
  ["AGBSPK",	"JI_DL_NST3_NM_K_T",	212,	201,	94.81,	8,	3.77,	1,	10,	4.72,	0,	0,	0],
  ["JMLHAR",	"JI_BAN_NST3_NM_K_T",	214,	173,	80.84,	6,	2.80,	2,	39,	18.22,	0,	0,	0],
  ["LMCBNK",	"JI_BAN_NST3_NM_K_T",	215,	184,	85.58,	0,	0.00,	16,	15,	6.98,	0,	0,	0],
  ["VIJAYP",	"JI_DL_NST3_NM_K_T",	216,	180,	83.33,	27,	12.50,	0,	36,	16.67,	0,	0,	0],
  ["yesbk_sms_new",	"MON_INTL_NM_K_T",	219,	44,	20.09,	38,	17.35,	0,	175,	79.91,	0,	0,	0],
  ["ANANDG",	"JI_BAN_NST3_NM_K_T",	222,	202,	90.99,	16,	7.21,	0,	20,	9.01,	0,	0,	0],
  ["GHADGE",	"JI_BAN_NST3_NM_K_T",	222,	198,	89.19,	10,	4.50,	2,	22,	9.91,	0,	0,	0],
  ["CGBSSP",	"JI_BAN_NST3_NM_K_T",	428,	390,	91.12,	25,	5.84,	0,	38,	8.88,	0,	0,	0],
  ["eurekaDS",	"JI_BAN_NST1_NM_K_T",	432,	405,	93.75,	6,	1.39,	0,	27,	6.25,	0,	0,	0],
  ["SMGSPS",	"JI_DL_NST3_NM_K_T",	435,	395,	90.80,	23,	5.29,	0,	40,	9.20,	0,	0,	0],
  ["Web_OTP",	"JI_DL_NSOTP1_NM_K_T",	562,	423,	75.27,	7,	1.25,	19,	120,	21.35,	0,	0,	0],
  ["Redcel",	"JI_DL_NST1_NM_K_T",	509,	334,	65.62,	49,	9.63,	4,	171,	33.60,	0,	0,	0],
  ["SSGBPS",	"JI_DL_NST3_NM_K_T",	465,	370,	79.57,	36,	7.74,	0,	95,	20.43,	0,	0,	0],
  ["SURSEL",	"JI_DL_NST3_NM_K_T",	461,	339,	73.54,	0,	0.00,	69,	53,	11.50,	0,	0,	0],
  ["UNSPSJ",	"JI_DL_NST3_NM_K_T",	355,	22,	6.20,	9,	2.54,	0,	333,	93.80,	0,	0,	0],
  ["ATMSTI",	"JI_BAN_NST3_NM_K_T",	305,	151,	49.51,	7,	2.30,	2,	152,	49.84,	0,	0,	0],
  ["indo_trans",	"JI_DL_NST5_NM_K_T",	181,	63,	34.81,	5,	2.76,	1,	117,	64.64,	0,	0,	0],
  ["TVSBNK",	"JI_DL_NST3_NM_K_T",	179,	130,	72.63,	0,	0.00,	12,	37,	20.67,	0,	0,	0],
  ["VMNSPW",	"JI_DL_NST3_NM_K_T",	176,	145,	82.39,	22,	12.50,	2,	29,	16.48,	0,	0,	0],
  ["JAVA_OTP",	"JI_BAN_NS! OTP1_NM_K_T",	64662,	53007,	81.98,	259,	0.40,	5408,	6247,	9.66,	0,	0,	0],
  ["infinitytest",	"JI_DL_NST4_NM_K_T",	5994,	4052,	67.60,	142,	2.37,	1648,	294,	4.90,	0,	0,	0],
  ["bharat_otp1",	"JI_BAN_NSOTP1_NM_K_T",	5070,	4703,	92.76,	14,	0.28,	41,	326,	6.43,	0,	0,	0,],
  ["nsc_sms",	"JI_BAN_NSGOV1_NM_K_T",	2001,	1283,	64.12,	146,	7.30,	3,	715,	35.73,	0,	0,	0],
  ["Acop_SMS",	"JI_BAN_NST1_NM_K_T",	660,	1663,	91.83,	35,	1.93,	14,	134,	7.40,	0,	0,	0],
  ["SSGBPS",	"JI_DL_NST3_NM_K_T",	465,	370,	79.57,	36,	7.74,	0,	95,	20.43,	0,	0,	0],
  ["MAHNDA",	"JI_BAN_NST3_NM_K_T",	442,	390,	84,	5,	1.13,	27,	25,	5.66,	0,	0,	0],
  ["manikpur",	"JI_DL_NST1_NM_K_T",	415,	335,	60,	42,	10.12,	10,	70,	16.87,	0,	0,	0],
  ["CSNSLS",	"JI_BAN_NST3_NM_K_T",	376,	338,	84,	11,	2.93,	0,	38,	10.11,	0,	0,	0],
  ["BMUCSL",	"JI_BAN_NST3_NM_K_T",	375,	331,	60,	35,	9.33,	0,	44,	11.73,	0,	0,	0],
  ["UNSPSJ",	"JI_DL_NST3_NM_K_T",	355,	22, 0,	9,	2.54,	0,	333,	93.80,	0,	0,	0],
  ["DNSPMD",	"JI_DL_NST3_NM_K_T",	307,	288,	100,	16,	5.21,	0,	19,	6.19,	0,	0,	0],
  ["Jk_atmsm",	"AIR_SKV_TA2_NM_T",	375,	671,	65.43,	53,	7.14,	0,	71,	9.57,	0,	0,	0],
  ['BSSAKL',	"JI_BAN_NST3_NM_K_T",	660,	550,	93.33,	81,	12.27,	0, 110,	16.67,	0,	0,	0],

];

let insertquery = "INSERT INTO table_1 (Username, SMSCNAME, TOTAL, DELIVRD, DELIVRDPer, SMSC, SMSCPer, EXPIRED, Other, OtherPer, DND, WrongSender, VendorError) values ?";

con.query(insertquery, [messages], function (err, result) {
  if (err) throw err;
  console.log("inserted into table table_1", result.affectedRows);
});

const table_2_insertion = async () => {
  let selectquery = "SELECT * FROM table_1";
  let data = con.query(selectquery).stream();
  data.on("data", (row) => {
    let objArr = [];
    let rowArr = [];
    let mobileno = row.mobile;
    const reg = /^[6-9]\d{9}$/gi;
    if (reg.test(mobileno)) {
      apiControllerRequest(row)
      // console.log("---row---", row);
      let rowObj = JSON.parse(JSON.stringify(row));
      for (let key in rowObj) {
        objArr.push(rowObj[key]);
        // console.log("-----keyobj-----", rowObj[key]);
      }
      rowArr.push(objArr);
      console.log("---rowArr---", rowArr);

      let table_2_insert_query = `INSERT INTO table_2(msg, mobile, status) VALUES ?`;
      con.query(table_2_insert_query, [rowArr], function (err, result) {
        if (err) throw err;
        console.log("inserted in table_2 successfully.");
        let table_2_update_status_query = "UPDATE table_2 SET status = 2";
        con.query(table_2_update_status_query, function (err, result) {
          if (err) throw err;
          console.log("status updated to 2 successfully.");
        });
      });
    }
    console.log("--not found--");
  });
};

// table_2_insertion();

const apiControllerRequest = (rowData) => {
  request({
    url: "https://localhost:3003/insert",
    method: "POST",
    Headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(rowData),
    json: true
  }, function(error, res, body) {
    console.log("-----body----", body)
  }) 
}

// apiController()

// const apiController = (rowData) => {
//   app.post('/insert', (req, res) => {
//     let data = rowData
//    res.send(data)
//    console.log("data")
//   })
// }

app.get('/insert', (req, res) => {
  let data= ""
  res.on("data", (chunk) => {
    data += chunk
  })
  res.on("end", () => {
    console.log(JSON.parse(data));
    res.send(data)
  })
})

app.listen(port, () => {
  console.log("server is running on port 3000")
})

// con.end()