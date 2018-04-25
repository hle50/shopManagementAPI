const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const { MONGOOSE_SECRET } = require('./api/utils/utils');
// const productRoutes = require("./api/routes/products");
// const orderRoutes = require("./api/routes/orders");
// const uploadRoutes = require("./api/routes/upload");
const userRoutes = require("./api/routes/user");
const productRoutes = require("./api/routes/product");
const shipperRoutes = require("./api/routes/shipper");
const clientRoutes = require("./api/routes/client");
const orderRoutes = require("./api/routes/order");
const uploadRoutes = require("./api/routes/upload");

mongoose.connect(`mongodb://hoale:${MONGOOSE_SECRET}@node-rest-api-shard-00-00-zjw5o.mongodb.net:27017,node-rest-api-shard-00-01-zjw5o.mongodb.net:27017,node-rest-api-shard-00-02-zjw5o.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-api-shard-0&authSource=admin`,
  {
    useMongoClient: true
  });
mongoose.Promise = global.Promise;
app.use('/uploads', express.static(path.join(__dirname, './api/uploads')));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
// app.use("/upload", uploadRoutes);
// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);
app.use("/upload", uploadRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/shipper", shipperRoutes);
app.use("/client", clientRoutes);
app.use("/order", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      message: error.message,
  });
});

module.exports = app;
