import axios from "axios";

const owmApiKey = process.env.VUE_APP_OWM_API_KEY;
const mapboxApiKey = process.env.VUE_APP_MAPBOX_API_KEY;

const getWeatherData = async (lon, lat) => {
  const weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?
      &lon=${lon}&lat=${lat}&exclude=hourly,minutely,alerts&units=metric&appid=${owmApiKey}`
  );
  const location = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/
      ${lon},${lat}.json?access_token=${mapboxApiKey}&types=country,place&limit=1`
  );

  return axios.all([weather, location]).then(
    axios.spread((...allData) => {
      return { ...allData };
    })
  );
};

const getSearchData = async searchKeyword => {
  return await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/
      ${searchKeyword}.json?access_token=${mapboxApiKey}&types=country,locality,place&limit=5&autocomplete=true`
  );
};

export { getSearchData, getWeatherData };
