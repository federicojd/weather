const axios = require("axios");

axios.defaults.headers.post["Content-Type"] = "application/json";

const openWeatherMap = axios.create({
  baseURL: `http://api.openweathermap.org/data/2.5`
});

module.exports = {
  openWeatherMap
};
