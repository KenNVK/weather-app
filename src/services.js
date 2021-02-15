import axios from "axios";

// const mapboxApiKey = process.env.VUE_APP_MAPBOX_API_KEY;

export const getWeatherData = async (lon, lat) => {
  const weather = await axios.get(`/api/weather?lon=${lon}&lat=${lat}`);
  const location = await axios.get(`/api/location?lat=${lat}&lon=${lon}`);

  return axios.all([weather, location]).then(
    axios.spread((...allData) => {
      return { ...allData };
    })
  );
};

export const getSearchData = async keyWord => {
  return await axios.get(`/api/search?name=${keyWord}`);
};
