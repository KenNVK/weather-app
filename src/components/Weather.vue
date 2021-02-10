<template>
  <div id="main" :class="isDay ? 'day' : 'night'">
    <div class="container grid wide">
      <h1 class="app-title">Weather in</h1>
      <div class="card-weather">
        <!-- Searchbar container -->
        <Searchbar
          @handle-weather-search="handleWeatherSearch"
          @handle-weather-current-location="handleCurrentLocation"
          @handle-refresh-weather-current="
            handlerefreshWeatherCurrent(forecastStorage.lon, forecastStorage.lat)
          "
        />

        <!-- weather animations container -->
        <Animations />

        <!-- Card weather container -->
        <div class="card-top row">
          <div class="col s-12">
            <span class="temp">{{ weather.temperature }}&deg;C</span><br />
          </div>
        </div>
        <div class="card-body row">
          <div class="body-desc col s-12">
            <span> {{ weather.description }} </span>
          </div>
          <div class="body-visi-wind col s-12">
            <span>
              <i class="ri-eye-line"></i>
              {{ weather.visibility }}&nbsp;km
            </span>
            <span>
              <i class="ri-windy-fill"></i>
              {{ weather.wind }}&nbsp;m/s
            </span>
          </div>
          <div class="body-feelslike col s-6">
            <p>{{ weather.feelsLike }}&deg;C</p>
            <span>feels like</span>
          </div>
          <div class="body-humidity col s-6">
            <p>{{ weather.humidity }}%</p>
            <span>humidity</span>
          </div>
        </div>
        <div class="card-bottom row">
          <h3 class="col s-12"><i class="ri-radar-line"></i>Daily forecast</h3>
          <ul
            class="bottom-daily col l-2 m-12 s-12"
            v-for="(day, index) in days.slice(1, 7)"
            :key="index"
          >
            <li class="bottom-daily-list">
              <p class="daily-date">{{ day.date }}</p>
              <img class="daily-icon" :src="day.icon" alt="icon" />
              <div class="daily-rain">
                <span> <i class="ri-rainy-fill"></i>{{ day.rain }}% </span>
              </div>
              <div class="daily-temp">
                <span><i class="ri-temp-hot-line"></i>{{ day.temp_max }}</span>
                <span><i class="ri-temp-cold-line"></i>{{ day.temp_min }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import Searchbar from "../components/Searchbar";
import Animations from "../components/Animations";
import { getWeatherData } from "../api";
import {
  isDay,
  weather,
  setWeatherData,
  days,
  showSearchBox,
  setLocalStorage,
  saveLocalStorage,
  locationStorage,
  forecastStorage,
  setRefreshIcon
} from "../utils/setup";

export default {
  name: "CurrentWeather",
  components: { Searchbar, Animations },
  setup() {
    // Handle render by position
    onBeforeMount(() => {
      if (locationStorage.value && forecastStorage.value) {
        handleData(forecastStorage.value.lon, forecastStorage.value.lat);
      } else {
        handleCurrentLocation();
      }
    });

    // Handle get data by curent location
    const handleCurrentLocation = () => {
      showSearchBox.value = false;
      navigator.geolocation.getCurrentPosition(position => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        handleData(lon, lat);
        setRefreshIcon(true);
      });
    };

    // Handle refresh data current
    const handlerefreshWeatherCurrent = (lon, lat) => {
      handleData(lon, lat);
      setRefreshIcon(true);
    };

    // Handle get data by search
    const handleWeatherSearch = (lon, lat) => {
      handleData(lon, lat);
      setRefreshIcon(true);
    };

    // Handle data function
    const handleData = (lon, lat) => {
      getWeatherData(lon, lat)
        .then(response => {
          saveLocalStorage(response[0].data, response[1].data);
          setLocalStorage();
          setWeatherData(forecastStorage.value, locationStorage.value);
        })
        .catch(error => console.log(error));
    };

    return {
      weather,
      isDay,
      days,
      locationStorage,
      forecastStorage,
      handleWeatherSearch,
      handleCurrentLocation,
      handlerefreshWeatherCurrent
    };
  }
};
</script>
<style scopde>
#main {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #4a5b88;
  overflow: auto;
}

.day {
  background: linear-gradient(to bottom left, #faeb65, #fcfcfc);
  color: #272727;
}

.night {
  background: linear-gradient(to bottom left, #4a5b88, #222222);
  color: white;
}

.card-weather {
  position: relative;
  padding: 12px;
  color: white;
  background: linear-gradient(to bottom right, #707070, #2b2f31);
  box-shadow: 0 0 12px 4px rgba(3, 3, 3, 0.85);
  cursor: default;
  user-select: none;
  overflow: hidden;
}

.app-title {
  font-size: 3rem;
  font-weight: 200;
  font-style: italic;
  padding-bottom: 10px;
}

.card-top .temp {
  font-weight: 300;
  font-size: 4.5rem;
  letter-spacing: -5px;
  white-space: nowrap;
}

.card-top .city-name {
  font-weight: 400;
  font-size: 1.5rem;
}

.card-body {
  padding-bottom: 12px;
  font-size: 1rem;
}

.body-desc {
  padding-bottom: 12px;
}

.body-visi-wind i {
  vertical-align: middle;
  padding-bottom: 3px;
}

.body-visi-wind span + span {
  margin-left: 24px;
}

.body-feelslike,
.body-humidity {
  padding-top: 6px;
}

.body-feelslike p,
.body-humidity p {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: -3px;
}

.card-bottom h3 {
  font-weight: 400;
  padding: 10px 12px;
  text-align: left;
}

.card-bottom h3 i {
  vertical-align: text-top;
  padding-right: 8px;
}

.bottom-daily {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  list-style: none;
}

.bottom-daily-list {
  padding: 12px 0;
  background: rgba(255, 255, 255, 0.08);
}

.daily-rain i {
  vertical-align: text-top;
  padding: 4px;
}

.daily-temp {
  padding-top: 12px;
}

.daily-temp i {
  vertical-align: text-top;
}

.daily-temp span + span {
  margin-left: 12px;
}

.card-top,
.card-bottom,
.card-body {
  position: relative;
  z-index: 1;
}
</style>
