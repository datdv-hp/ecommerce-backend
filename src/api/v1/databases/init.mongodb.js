const mongoose = require('mongoose');

function dbConnect(uri) {
  const db = mongoose.createConnection(uri);

  db.on('error', function (err) {
    console.log(`MongoDB::: connection ${this.name} ${JSON.stringify(err)}`);
    db.close().catch(() =>
      console.log(`MongoDB::: failed to connect ${this.name}`)
    );
  });

  db.on('connected', function () {
    mongoose.set('debug', function (col, method, query, doc) {
      console.log(
        `MongoDB Debug::: ${
          this.conn.name
        }::${col}::${method}::(${JSON.stringify(query)},${JSON.stringify(doc)})`
      );
    });
    console.log(`MongoDB::: connected ${this.name}`);
  });

  db.on('disconnected', function (err) {
    console.log(`MongoDB::: disconnected ${this.name} ${JSON.stringify(err)}`);
  });
  return db;
}

const { MONGODB_URI } = process.env;
const datShopDB = dbConnect(MONGODB_URI);
// const shopDB = dbConnect(SHOP_URI);
// const testShopDB = dbConnect(TEST_SHOP_URI);

module.exports = { datShopDB };
