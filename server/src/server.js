require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const connectDb = require("./config/connectDb");
const router = require("./routers/router");

connectDb();

const port = process.env.PORT || 3300;

app.use(cors());

const connections = [];

app.use((req, res, next) => {
  if (req.url.endsWith('.mp4')) {
    const token = req.header('Authorization');
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      const userConnection = connections.find(ele => ele === user.id);
      if (userConnection) {
        next();
        return;
      }

      if (connections.length === 2) {
        res.status(503).json({
          status: 'error',
          message: 'Error: 503\nThis video file cannot be played\nPlease try again later'
        });
      } else {
        connections.push(user.id);
        console.log(connections);
        next();
      }
    }
    catch (err) {
      res.status(401).json({
        status: 'error',
        message: 'Error: 401\nNot Authorized.'
      })
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
