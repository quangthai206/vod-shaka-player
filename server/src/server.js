require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const connectDb = require("./config/connectDb");
const router = require("./routers/router");

connectDb().then(() => {
  console.log('db connected');
});

const port = process.env.PORT || 3300;

app.use(cors());

let connections = [];

setInterval(() => {
  const currentTime = Date.now();

  connections = connections.filter((connection) => {
    const delta = Math.round((currentTime - connection.timestamp) / 1000);
    return delta <= 30;
  });

  console.log(connections);

}, 3000)

app.use((req, res, next) => {
  if (req.url.endsWith('.mp4')) {
    const token = req.header('Authorization');
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      const userConnection = connections.find(ele => ele.id === user.id);
      if (userConnection) {
        userConnection.timestamp = Date.now();
        next();
        return;
      }

      if (connections.length === 2) {
        res.status(503).json({
          status: 'error',
          message: 'Error: 503\nThis video file cannot be played\nPlease try again later'
        });
      } else {
        connections.push({
          id: user.id,
          timestamp: Date.now()
        });
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
