module.exports = app => {
  const controller = app.controllers.locations;
  app.get("/v1/location", controller.location);
  app.get("/v1/current", controller.forecast);
  app.get("/v1/current/:city", controller.forecast);
  app.get("/v1/forecast", controller.forecast);
  app.get("/v1/forecast/:city", controller.forecast);
};
