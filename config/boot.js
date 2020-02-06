module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(app.get("port"), () => {
      console.log(`API - Magic happens on port ${app.get("port")}`);
    });
  }
};
