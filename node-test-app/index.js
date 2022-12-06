const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = 4000;

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post("/uploadFile", (req, res) => {
  axios.get(req.body.url, { responseType: "stream" }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream("uploads/" + req.body.name))
        .on("error", reject)
        .once("close", () => resolve("uploads/" + req.body.name));
    });
  });
  res.send("Done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
