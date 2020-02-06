const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;

module.exports = app => {
  app.set("port", PORT);
  app.set("json spaces", 2);

  app.use(express.static("./public"));
  app.use(morgan("dev"));

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
};
