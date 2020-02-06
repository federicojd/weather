const publicIp = require("public-ip");
const { ipApi } = require("../config/api/ip-api");
const { openWeatherMap } = require("../config/api/openWeatherMap");

module.exports = app => {
  const location = async (req, res) => {
    try {
      res.status(200).json({ city: await getCityInfo() });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const forecast = async (req, res) => {
    let url = req.url.split("/")[2];
    url = url == "current" ? "weather" : url;

    let { city } = req.params;
    let openWeatherMapCity = city;

    try {
      if (city == undefined) {
        city = await getCityInfo();
        openWeatherMapCity = `${city.city},${city.countryCode}`;
      }
      const params = {
        params: {
          q: openWeatherMapCity,
          appid: process.env.OPEN_WEATHER_MAP_KEY
        }
      };
      const response = await openWeatherMap.get(`/${url}`, params);
      res.status(200).json({ city: city, data: response.data });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  return { location, forecast };

  async function getCityInfo() {
    try {
      const ip = await publicIp.v4();
      const response = await ipApi.get(`/${ip}`);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
};
