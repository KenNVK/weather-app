<template>
  <Weather />
</template>

<script>
import Weather from "./components/Weather";
export default {
  name: "App",
  components: {
    Weather
  },
  setup() {
    document.title = "Weather app";
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: roboto, helvetica, sans-serif;
  text-align: center;
}
</style>
