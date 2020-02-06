require("dotenv").config();
const express = require("express");
const consign = require("consign");

const app = express();

consign({ verbose: false })
  .include("config/express.js")
  .then("models")
  .then("controllers")
  .then("routes")
  .then("config/boot.js")
  .into(app);

module.exports = app;
