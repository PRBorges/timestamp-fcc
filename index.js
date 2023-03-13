// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// Require to use path.join
const path = require("path");
// Handlers for /api
const api = require("./api");

// Use dotenv
const dotenv = require("dotenv");
dotenv.config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// Install router with handlers for /api
app.use("/api", api);

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
