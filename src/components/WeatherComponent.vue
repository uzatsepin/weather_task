<template>
  <ModalComponent
    :isVisible="isModalVisible"
    @close="closeModal"
    :weatherData="weatherData"
  />
  <div v-if="GET_IS_CART_LOADING">
    <img src="../assets/img/Spinner-1s-200px.svg" alt="Loading" />
  </div>
  <div v-else class="weather">
    <h3 class="weather__title">
      {{ weatherData.name }},
      {{ weatherData && weatherData.sys ? weatherData.sys.country : null }}
      <button class="weather__btn-delete" @click="openModal" v-if="!isStatic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </h3>
    <div class="weather__wrapper">
      <img
        :src="`http://openweathermap.org/img/wn/${
          weatherData && weatherData.weather
            ? weatherData.weather[0].icon
            : 'null'
        }@2x.png`"
        alt="img"
      />
      <div class="weather__temp">
        <p class="weather__temp-item">
          {{
            Math.round(
              weatherData && weatherData.main ? weatherData.main.temp : null
            )
          }}&deg;
        </p>
        <p class="weather__temp-descr">
          {{
            weatherData && weatherData.weather
              ? weatherData.weather[0].description
              : null
          }}
        </p>
      </div>
    </div>
    <div class="weather__info">
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/temperature.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Відчув. як:</span>
          {{
            Math.round(
              weatherData && weatherData.main
                ? weatherData.main.feels_like
                : null
            )
          }}
          &deg;
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/wind.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Швид. вітру</span>
          {{ weatherData && weatherData.wind ? weatherData.wind.speed : null }}
          <span class="weather__info-speed">km/h</span>
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/humidity.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Волог.</span>
          {{
            weatherData && weatherData.main ? weatherData.main.humidity : null
          }}
          %
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/weather-overcast.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Видимість</span
          >{{ weatherData ? weatherData.visibility : null }} м.
        </p>
      </div>
    </div>
    <div class="weather__bar">
      <BarComponent
        :time="weatherData.weatherTime"
        :temp="weatherData.weatherTemp"
      />
    </div>
  </div>
</template>

<script>
import BarComponent from "./BarComponent.vue";
import { mapGetters } from "vuex";
import ModalComponent from "./ModalComponent.vue";
export default {
  name: "WeatherComponent",
  components: { BarComponent, ModalComponent },
  data() {
    return {
      isModalVisible: false,
      isLoading: true,
    };
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
    isStatic: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["GET_IS_CART_LOADING"]),
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style>
@import "../assets/styles/styles.css";
@import "../assets/styles/stylesComponent/weatherStyle.css";
</style>
