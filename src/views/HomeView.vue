<template>
  <div class="home">
    <InputTownComponent />
    <div class="weather__view" v-if="WEATHER_BY_IP">
      <h3 class="weather__view-title">
        *Інформація про погоду взята на основі вашої IP-адерси
      </h3>
      <WeatherComponent v-if="WEATHER_BY_IP" :weatherData="WEATHER_BY_IP" />
    </div>
    <h3 class="weather__view-title">Картки з обраними містами:</h3>
    <div class="weather__inner" v-if="GET_WEATHER_CART.length">
      <div
        class="weather__cards"
        v-for="card in GET_WEATHER_CART"
        :key="card.id"
      >
        <WeatherComponent v-if="card" :weatherData="card" />
      </div>
    </div>
  </div>
</template>

<script>
import InputTownComponent from "@/components/InputTownComponent.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    InputTownComponent,
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
  font-size: 14px;
  margin-top: 20px;
  font-weight: normal;
}
.weather__inner {
  display: flex;
  justify-content: center;
  gap: 0 20px;
  flex-wrap: wrap;
}
</style>
