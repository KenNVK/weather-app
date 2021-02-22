import axios from "axios";

export const getWeatherData = async (lon, lat) => {
  const weather = await axios.get(`/api/weather?lon=${lon}&lat=${lat}`);
  const location = await axios.get(`/api/location?lat=${lat}&lon=${lon}`);
  return await Promise.all([weather, location]);
};

export const getSearchData = async keyWord => {
  return await axios.get(`/api/search?name=${keyWord}`);
};
