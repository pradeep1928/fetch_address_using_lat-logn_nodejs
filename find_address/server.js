const express = require("express");
const port = process.env.PORT || 3000;

const getAddress = require("./getAddress");
const latlong = require("./latlong");
const Users = require("./user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("This is get method");
});

app.post("/address", (req, res) => {
  let { address } = req.body;
  getAddress(address, (error, { location, lattitude, longitute }) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json({ location, lattitude, longitute });
  });
});

app.post("/latlong", (req, res) => {
  let { latlon } = req.body;
  latlong(latlon, (error, { formatted, postcode, timezone }) => {
    let userObject = {};
    if (error) {
      res.status(400).send(error);
    }
    let postCode = postcode;

    getLocation(userObject, postCode);

    if (userObject && Object.keys(userObject).length > 0) {
      res.status(200).send(userObject);
    } else {
      console.log("pincode is invalid or not found");
      res.status(400).send("No user found on this location.");
    }

    // res.status(200).json({formatted,postCode,timezone})
  });
});

function getLocation(userObj, postCode) {
  Users.forEach((user) => {
    let userkey = Object.keys(user);
    let pinkey = user[userkey];
    console.log("this is userkey", userkey);
    if (pinkey.hasOwnProperty(postCode)) {
      userObj.user = userkey[0];
      userObj.pincode = postCode;
      userObj.address = pinkey[postCode];
    } else {
      console.log("pin not found");
    }
  });

  console.log(userObj);
  return userObj;
}

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
