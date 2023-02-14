<template>
  <div class="home">
<<<<<<< HEAD
    <button class="weather-add-card-btn" @click="addAnEmptyCard">
      Додати місто
    </button>
    <div class="weather__inner">
      <div class="weather__item">
        <h3 class="weather__item-title">Дані взяті по IP</h3>
        <WeatherComponent
          :weatherData="weatherDataByIp"
          :isStatic="true"
          :cardId="-100"
        />
      </div>
      <div class="weather__item">
        <h3 class="weather__item-title">Додані картки</h3>
        <div
          class="weather__cards"
          v-for="card in GET_WEATHER_CARDS"
          :key="card.id"
        >
          <WeatherComponent
            v-if="card"
            :weatherData="card.weatherData"
            :cardId="card.id"
            @onCardDelete="onCardDelete"
          />
        </div>
=======
    <InputTownComponent />
    <div class="weather__view" v-if="WEATHER_BY_IP">
      <h3 class="weather__view-title">
        *Інформація про погоду взята на основі вашої IP-адерси
      </h3>
      <WeatherComponent
        v-if="WEATHER_BY_IP"
        :weatherData="WEATHER_BY_IP"
        :isStatic="true"
      />
    </div>
    <h3 class="weather__view-title">Картки з обраними містами:</h3>
    <div class="weather__inner" v-if="GET_WEATHER_CART.length">
      <div
        class="weather__cards"
        v-for="card in GET_WEATHER_CART"
        :key="card.id"
      >
        <WeatherComponent v-if="card" :weatherData="card" />
>>>>>>> main
      </div>
    </div>
  </div>
</template>

<script>
import { getWeatherCardByIp } from "@/api/weatherAPI";
import WeatherComponent from "@/components/WeatherComponent.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      weatherDataByIp: {},
    };
  },
  name: "HomeView",
  components: {
    WeatherComponent,
  },
  computed: {
    ...mapGetters(["GET_WEATHER_CARDS"]),
  },
  methods: {
    addAnEmptyCard() {
      this.$store.commit("ADD_WEATHER_CARD", { weatherData: {} });
    },
    onCardDelete(cardId) {
      this.$store.commit("REMOVE_CARD", { cardId: cardId });
    },
  },
  async created() {
    this.weatherDataByIp = (await getWeatherCardByIp()).data;
  },
};
</script>

<style>
@import "../assets/styles/styles.css";
.weather__inner {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 0 30px;
}
.weather__item {
  width: 45%;
}

.weather__item-title {
  text-align: center;
}
.weather-add-card-btn {
  padding: 15px 20px;
  background-color: var(--btn-color);
  color: #ffffff;
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
}

.weather-add-card-btn:active {
  transition: 0.3s;
  transform: translateY(-3px);
}

.weather-add-card-btn:hover {
  background-color: var(--btn-color-hover);
  transition: 0.3s;
}
.weather__item-descr {
  font-size: 14px;
  margin-top: 20px;
  font-weight: normal;
  text-align: center;
}
</style>
