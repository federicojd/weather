const axios = require("axios");

axios.defaults.headers.post["Content-Type"] = "application/json";

const ipApi = axios.create({
  baseURL: `http://ip-api.com/json`
});

module.exports = {
  ipApi
};
