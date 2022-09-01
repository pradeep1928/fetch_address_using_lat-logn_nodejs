const express = require("express");
const port = process.env.PORT || 3001;

const users = require("./ user");

const app = express();

app.use(express.json());

// users.forEach((value) => {
//   let userdata = Object.keys(value)
//   for (let key in value) {
//     console.log(value[key])
//     console.log(userdata)
//   }
// })

app.get("/", (req, res) => {
  res.status(200).send(users);
});

app.post("/user", (req, res) => {
  const name = req.body.name;
  try {
    let userarr = [];
    users.forEach((user) => {
      if (user.hasOwnProperty(name)) {
        userarr.push(user[name]);
      }
    });

    if (userarr && userarr.length > 0) {
      for (let user of userarr) {
        console.log(user);
        res.status(200).send(user);
      }
    } else {
      console.log("user not found");
      res.status(400).send("user not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/pincode", (req, res) => {
  const { pincode } = req.body;
  let userObj = {}
  users.forEach((user) => {
    let userkey = Object.keys(user);
    let pinkey = user[userkey];
    if (pinkey.hasOwnProperty(pincode)) {
      userObj.user = userkey[0]
      userObj.pincode = pincode;
      userObj.address = pinkey[pincode]
    } else {
      console.log("pin not found");
    }
  });

  if (userObj && Object.keys(userObj).length > 0) {
    console.log(userObj)
    res.status(200).send(userObj)
  }
  else {
    console.log("pincode is invalid or not found")
    res.status(400).send("pincode is invalid or not found")
  }

});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
