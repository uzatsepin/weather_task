<template>
  <div class="home">
    {{ weatherData }}
    <InputAutocomplete @cityData="receiveCityData" />
    <div class="weather__view">
      <template v-if="weatherData != undefined">
        <WeatherComponent :weatherData="city" />
        <WeatherComponent :weatherData="city" />
      </template>
    </div>
  </div>
</template>

<script>
import InputAutocomplete from "@/components/InputAutocomplete.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    InputAutocomplete,
    WeatherComponent,
  },
  data() {
    return {
      city: [],
      weatherData: undefined,
      time: Object(),
      temp: Object(),
      geoCodeIp: undefined,
      weatherByDefault: undefined,
    };
  },
  methods: {
    receiveCityData(cityData) {
      this.city = cityData;
    },
  },
  mounted() {
    {
      axios
        .get("https://ipapi.co/json/")
        .then((response) => (this.weatherByDefault = response.data))
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style>
.weather__view {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
