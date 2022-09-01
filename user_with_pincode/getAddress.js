const express = require("express");
const port = process.env.PORT || 3002;

const users = require("./ user");

const app = express();

app.use(express.json());

const usersdata2 = require("./userData2");

app.post("/getaddress", (req, res) => {
const { name } = req.body;
usersdata2.forEach((user) => {
    username = Object.keys(user)

    if (username.includes(name)) {
        let userData = user[name]
        console.log(userData)
        res.status(200).send(userData)
    }
    else {
        console.log("User not found");
        res.status(400).send("User not found")
    }
})
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
  