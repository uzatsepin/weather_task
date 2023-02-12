<template>
  <div class="home">
    <InputAutocomplete />
    <div class="weather__view">
      <h3 class="weather__view-title">
        *Інформація про погоду взята на основі вашої IP-адерси
      </h3>
      <WeatherComponent
        v-if="Object.keys(WEATHER_BY_IP).length"
        :weatherData="WEATHER_BY_IP"
      />
    </div>
    <div class="weather__inner" v-if="GET_WEATHER_CART">
      <div
        class="weather__cards"
        v-for="card in GET_WEATHER_CART"
        :key="card.id"
      >
        <WeatherComponent
          v-if="Object.keys(GET_WEATHER_CART).length"
          :weatherData="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputAutocomplete from "@/components/InputAutocomplete.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    InputAutocomplete,
    WeatherComponent,
  },
  computed: {
    ...mapGetters(["WEATHER_BY_IP", "GET_WEATHER_CART"]),
  },
  methods: {
    ...mapActions(["GET_WEATHER_BY_IP"]),
  },
  created() {
    this.GET_WEATHER_BY_IP();
  },
};
</script>

<style>
.weather__view-title {
  display: block;
  font-size: 18px;
  margin-top: 20px;
}
</style>
