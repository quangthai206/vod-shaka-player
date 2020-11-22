const mongoose = require("mongoose");
const bluebird = require("bluebird");

let connectDb = () => {
  mongoose.Promise = bluebird;
  let URI = `mongodb+srv://test123456:test123456@cluster0.v0t8i.mongodb.net/myapp?retryWrites=true&w=majority`;
  console.log(URI);
  console.log("connect db");
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
