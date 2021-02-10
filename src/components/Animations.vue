<template>
  <div>
    <div icon="sunny" v-if="animations.clearSky">
      <span class="sun"></span>
    </div>
    <div icon="snowy" v-if="animations.snowy">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div icon="stormy" v-if="animations.stormy">
      <span class="cloud"></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div icon="cloudy" v-if="animations.cloudy">
      <span class="cloud"></span>
      <span class="cloud"></span>
    </div>
    <div icon="nightmoon" v-if="animations.cloudyNight">
      <span class="moon"></span>
      <span class="cloud"></span>
      <span class="cloud"></span>
      <span class="meteor"></span>
    </div>
    <div icon="nightmoon" v-if="animations.clearNight">
      <span class="moon"></span>
      <span class="meteor"></span>
    </div>
  </div>
</template>

<script>
import { animations } from "../utils/setup";
export default {
  name: "Animations",
  setup() {
    return { animations };
  }
};
</script>

<style></style>
