require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
let multer = require("multer");
let upload = multer({ dest: "src/uploads/" });

const connectDb = require("./config/connectDb");
const router = require("./routers/router");

const port = process.env.PORT || 3300;

app.use(express.static('public'))
app.use(cors());

connectDb();
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use("/api", router);

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "hello",
  });
});

app.listen(port, () => console.log(`this app running on port ${port}`));
