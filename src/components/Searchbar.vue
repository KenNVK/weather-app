<template>
  <div class="search-bar">
    <div class="search-location">
      <i class="ri-map-pin-line search-location-icon" @click="isShow = !isShow"></i>
      <span class="search-location-name" @click="isShow = !isShow">
        {{ weather.locationName }}
      </span>
    </div>
    <i
      class="ri-refresh-line refresh-icon"
      :class="refresh ? 'refresh-icon-active' : ''"
      @click="refreshWeatherCurrent(forecastStorage.lon, forecastStorage.lat)"
    ></i>
    <div class="search-box" v-if="isShow">
      <div class="input-wrap" :class="loading ? 'loading' : ''">
        <i class="ri-search-line search-box-icon"></i>
        <input
          name="input"
          type="text"
          placeholder="Enter City..."
          autocomplete="off"
          v-focus
          v-model="keyWord"
          @input="handleLocationSearch(keyWord)"
        />
        <div class="loading-icon"></div>
      </div>
      <div class="search-list">
        <div class="search-list-item" @click="getWeatherCurrentLocation">
          <i class="ri-focus-3-line search-list-icon"></i>
          <span>Curent Location</span>
        </div>
        <ul v-for="location in locations" :key="location.id">
          <li
            class="search-list-item"
            @click="
              locationSelect(location.geometry.coordinates[0], location.geometry.coordinates[1])
            "
          >
            <i class="ri-map-pin-line search-list-icon"></i>
            <span>{{ location.place_name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div id="modal" v-if="isShow" @click="isShow = false"></div>
</template>

<script>
import { getSearchData } from "../services";
import {
  weather,
  isShow,
  keyWord,
  locations,
  loading,
  setSearchData,
  forecastStorage,
  refresh
} from "../utils/setup";
export default {
  name: "Searchbar",
  emits: [
    "handle-weather-search",
    "handle-weather-current-location",
    "handle-refresh-weather-current"
  ],
  directives: {
    focus: el => el.focus()
  },
  setup(props, { emit }) {
    const locationSelect = (lon, lat) => {
      emit("handle-weather-search", lon, lat);
      isShow.value = false;
    };

    const getWeatherCurrentLocation = () => {
      emit("handle-weather-current-location");
    };

    const refreshWeatherCurrent = (lon, lat) => {
      emit("handle-refresh-weather-current", lon, lat);
    };

    const handleLocationSearch = keyWord => {
      getSearchData(keyWord)
        .then(response => setSearchData(response.data, true))
        .catch(error => console.log(error));
    };

    return {
      weather,
      isShow,
      locationSelect,
      keyWord,
      locations,
      loading,
      forecastStorage,
      refresh,
      handleLocationSearch,
      getWeatherCurrentLocation,
      refreshWeatherCurrent
    };
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  position: relative;
  z-index: 99;
}

.search-location {
  display: flex;
  align-items: center;
}

.search-location-name {
  padding-left: 8px;
  cursor: pointer;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.search-location-icon {
  font-size: 1.3rem;
  cursor: pointer;
}

.refresh-icon {
  margin-left: auto;
  font-size: 1.3rem;
  cursor: pointer;
}
.refresh-icon-active {
  animation: rotate 750ms ease-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.search-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  padding: 10px 0;
  border-radius: 10px;
  color: #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #222;
}

.input-wrap {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

[name="input"] {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  background-color: transparent;
  color: #ccc;
  border: none;
  outline: none;
  -webkit-appearance: none;
}

.loading .loading-icon {
  border: 0.2rem solid grey;
  width: 2rem;
  height: 2rem;
  padding: 12px;
  border-top-color: white;
  border-radius: 50%;
  animation: spinner 1s linear 0s infinite;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.search-list {
  text-align: left;
}

.search-list-item {
  display: flex;
  align-items: center;
  list-style: none;
  cursor: pointer;
  padding: 10px;
}

.search-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.search-list-icon {
  padding-right: 10px;
}

#modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(39, 39, 39, 0.5);
  z-index: 10;
}
</style>
