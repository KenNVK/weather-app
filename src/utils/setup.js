import { ref, reactive } from "vue";
import moment from "moment";

const isDay = ref(true);
const days = ref([]);
const weather = reactive({
  locationName: "",
  temperature: "",
  description: "",
  visibility: "",
  wind: "",
  feelsLike: "",
  humidity: ""
});
const animations = reactive({
  stormy: false,
  cloudy: false,
  cloudyNight: false,
  clearSky: false,
  clearNight: false,
  snowy: false,
  haze: false
});
const isShow = ref(false);
const keyWord = ref("");
const locations = ref([]);
const loading = ref(false);
const refresh = ref(false);
const forecastStorage = ref(JSON.parse(localStorage.getItem("forecast")));
const locationStorage = ref(JSON.parse(localStorage.getItem("location")));

const setSearchData = (data, boolean) => {
  locations.value = data.features;
  loading.value = boolean;
  setTimeout(() => {
    loading.value = !boolean;
  }, 300);
};

const setRefreshIcon = boolean => {
  refresh.value = boolean;
  setTimeout(() => {
    refresh.value = !boolean;
  }, 1000);
};

// save data to local storage
const saveLocalStorage = (forecast, location) => {
  localStorage.setItem("forecast", JSON.stringify(forecast));
  localStorage.setItem("location", JSON.stringify(location));
};

const setLocalStorage = () => {
  forecastStorage.value = JSON.parse(localStorage.getItem("forecast"));
  locationStorage.value = JSON.parse(localStorage.getItem("location"));
};

// set value for weather app
const setWeatherData = (forecast, location) => {
  console.log(forecast);
  // set current weather data
  weather.locationName = location.features[0].place_name;
  weather.temperature = Math.round(forecast.current.temp);
  weather.description = forecast.current.weather[0].description;
  weather.visibility = (forecast.current.visibility / 1000).toFixed(1);
  weather.wind = forecast.current.wind_speed;
  weather.feelsLike = Math.round(forecast.current.feels_like);
  weather.humidity = Math.round(forecast.current.humidity);

  // set Daily weather data
  days.value = forecast.daily;
  days.value.forEach(day => {
    day.icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    day.date = moment(day.dt * 1000).format("ddd, DD MMM");
    day.description = day.weather[0].description;
    day.rain = Math.round(day.pop * 100);
    day.temp_max = Math.round(day.temp.max);
    day.temp_min = Math.round(day.temp.min);
  });

  // Check the time of day
  const timeOfDay = forecast.current.weather[0].icon;
  if (timeOfDay.includes("n")) {
    isDay.value = false;
  } else {
    isDay.value = true;
  }

  // Check animations
  const mainWeather = forecast.current.weather[0].main;
  if (mainWeather.includes("Clouds") && isDay.value) {
    animations.stormy = false;
    animations.cloudy = true;
    animations.cloudyNight = false;
    animations.clearSky = false;
    animations.clearNight = false;
    animations.haze = false;
    animations.snowy = false;
  } else if (mainWeather.includes("Clouds") && !isDay.value) {
    animations.stormy = false;
    animations.cloudy = false;
    animations.cloudyNight = true;
    animations.clearSky = false;
    animations.clearNight = false;
    animations.haze = false;
    animations.snowy = false;
  } else if (
    mainWeather.includes("Thunderstorm") ||
    mainWeather.includes("Rain") ||
    mainWeather.includes("Drizzle")
  ) {
    animations.stormy = true;
    animations.cloudy = false;
    animations.cloudyNight = false;
    animations.clearSky = false;
    animations.clearNight = false;
    animations.haze = false;
    animations.snowy = false;
  } else if (mainWeather.includes("Clear") && isDay.value) {
    animations.stormy = false;
    animations.cloudy = false;
    animations.cloudyNight = false;
    animations.clearSky = true;
    animations.clearNight = false;
    animations.haze = false;
    animations.haze = false;
    animations.snowy = false;
  } else if (mainWeather.includes("Clear") && !isDay.value) {
    animations.stormy = false;
    animations.cloudy = false;
    animations.cloudyNight = false;
    animations.clearSky = false;
    animations.clearNight = true;
    animations.haze = false;
    animations.snowy = false;
  } else if (mainWeather.includes("Snow")) {
    animations.stormy = false;
    animations.cloudy = false;
    animations.cloudyNight = false;
    animations.clearSky = false;
    animations.clearNight = false;
    animations.haze = false;
    animations.snowy = true;
  } else {
    animations.stormy = false;
    animations.cloudy = false;
    animations.cloudyNight = false;
    animations.clearSky = false;
    animations.clearNight = false;
    animations.haze = true;
    animations.snowy = false;
  }
};

export {
  isDay,
  weather,
  animations,
  isShow,
  keyWord,
  locations,
  loading,
  days,
  refresh,
  forecastStorage,
  locationStorage,
  setWeatherData,
  setSearchData,
  saveLocalStorage,
  setLocalStorage,
  setRefreshIcon
};
