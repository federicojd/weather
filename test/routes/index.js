const request = require("supertest");
const should = require("should");
const app = require("../../index");

const controller = require("../../controllers/locations");

global.app = app;
global.request = request(app);

describe("WEATHER API SERVER", () => {
  it("returns the API server status", done => {
    request(app)
      .get("/v1")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.status.should.eql("running");
        done();
      });
  });

  it("should return my own location", done => {
    request(app)
      .get(`/v1/location`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("city");
        res.body.city.should.have.property("country");
        res.body.city.country.should.equal("Argentina");
        done();
      });
  }).timeout(5000);

  it("should get current weather at my IP in Argentina ", done => {
    request(app)
      .get(`/v1/current`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("city");
        res.body.city.should.have.property("country");
        res.body.city.country.should.equal("Argentina");
        done();
      });
  }).timeout(5000);

  it("should get current weather data in Caracas", done => {
    const city = "Caracas";
    request(app)
      .get(`/v1/current/${city}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("city");
        res.body.city.should.equal("Caracas");
        res.body.should.have.property("data");
        res.body.data.should.have.property("coord");
        res.body.data.coord.lon.should.equal(-66.88);
        done();
      });
  }).timeout(5000);

  it("should return status 500 for unknown city", done => {
    const city = "XYZ";
    request(app)
      .get(`/v1/current/${city}`)
      .expect(500)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("name");
        res.body.should.have.property("message");
        res.body.name.should.equal("Error");
        res.body.message.should.equal("Request failed with status code 404");
        done();
      });
  }).timeout(5000);

  it("should get 5 days forecast weather at my IP in Argentina ", done => {
    request(app)
      .get(`/v1/forecast`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("city");
        res.body.should.have.property("data");
        res.body.data.should.have.property("list");
        res.body.data.list.should.be.an.Array();
        res.body.data.list.should.not.be.empty();
        res.body.data.list.length.should.be.equal(40); // 5 days every 3hours = 40 itemss
        res.body.city.should.have.property("country");
        res.body.city.country.should.equal("Argentina");
        done();
      });
  }).timeout(5000);

  it("should get 5 days forecast weather at Caracas", done => {
    const city = "Caracas";
    request(app)
      .get(`/v1/forecast/${city}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("city");
        res.body.city.should.be.equal("Caracas");
        res.body.should.have.property("data");
        res.body.data.should.have.property("list").with.lengthOf(40);
        res.body.data.should.have.property("city");
        res.body.data.list.should.be.an.Array();
        res.body.data.list.should.not.be.empty();
        res.body.data.city.name.should.be.equal("Caracas");
        res.body.data.city.country.should.be.equal("VE");
        done();
      });
  }).timeout(5000);

  it("should return status 500 for forecast unknown city", done => {
    const city = "XYZ";
    request(app)
      .get(`/v1/forecast/${city}`)
      .expect(500)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("name");
        res.body.should.have.property("message");
        res.body.name.should.equal("Error");
        res.body.message.should.equal("Request failed with status code 404");
        done();
      });
  }).timeout(5000);
});
