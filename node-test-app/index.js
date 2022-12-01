const express = require("express");
const app = express();
const port = 4000;
var qs = require("querystring");
const fileUpload = require("express-fileupload");

var cors = require("cors");
app.use(cors());
app.use(fileUpload()); // Don't forget this line!

app.post("/uploadFile", (req, res) => {
  console.log("FILESSSSS: ", req.files);
  if (req.method == "POST") {
    var body = "";

    req.on("data", function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      //   if (body.length > 1e6) req.connection.destroy();
    });

    req.on("end", function () {
      //   var post = qs.parse(body);
      console.log("File:", body);
      // use post['blah'], etc.
    });
  }
  res.send("Done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
