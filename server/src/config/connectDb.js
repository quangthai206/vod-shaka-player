const mongoose = require("mongoose");
const bluebird = require("bluebird");

let connectDb = () => {
  mongoose.Promise = bluebird;
  let URI = `mongodb+srv://test123456:test123456@cluster0.v0t8i.mongodb.net/myapp?retryWrites=true&w=majority`;
  // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  console.log(URI);
  console.log("connecting db");
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
