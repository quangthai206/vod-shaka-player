require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDb = require("./config/connectDb");
const router = require("./routers/router");

connectDb();

const port = process.env.PORT || 3300;

app.use(cors());

let count = 0;

app.use((req, res, next) => {
  if (req.url.endsWith('.mp4')) {
    console.log(req.header('Authorization'));
    console.log(req.url);
    if (count === 20) {
      res.status(503).json({
        status: 'error',
        message: 'Server is busy'
      });
    } else {
      count++;
      next()
    }
  } else {
    next();
  }

})

app.use(express.static(__dirname + '/public'));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "hello",
  });
});

app.listen(port, () => console.log(`this app running on port ${port}`));
