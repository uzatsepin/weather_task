<template>
  <div class="weather">
    <h3 class="weather__title">
      {{ weatherData.name }},
      {{ weatherData && weatherData.sys ? weatherData.sys.country : null }}
      <button class="weather__btn-delete" @click="deleteWeatherFromCart">
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
          {{ weatherData && weatherData.wind ? weatherData.main.speed : null }}
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
        v-if="GET_WEATHER_TIME.length > 0 && GET_WEATHER_TEMP.length > 0"
        :time="GET_WEATHER_TIME"
        :temp="GET_WEATHER_TEMP"
      />
    </div>
  </div>
</template>

<script>
import BarComponent from "./BarComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "WeatherComponent",
  components: { BarComponent },

  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      "GET_WEATHER_TIME",
      "GET_WEATHER_TEMP",
      "GET_CITY_FOR_WEATHER",
    ]),
  },
  methods: {
    deleteWeatherFromCart() {
      this.$emit("deleteWeatherFromCart");
    },
  },
};
</script>

<style>
@import "../assets/styles/styles.css";

.weather {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  max-width: 335px;
}
.weather:hover {
  transform: scale(1.02);
}

.weather__title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.weather__wrapper {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  align-items: center;
}
.weather__temp-item {
  font-size: 42px;
  font-weight: lighter;
}
.weather__temp-descr {
  color: #bfbfc1;
  font-size: 14px;
}
.weather__info {
  margin: 30px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 210px;
  gap: 20px 30px;
  font-size: 12px;
  text-align: left;
}
.weather__info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather__info-img {
  width: 26px;
  height: auto;
}
.weather__info-descr {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  max-width: 120px;
}
.weather__info-descr span {
  color: #bfbfc1;
  font-size: 14px;
  display: block;
}
.weather__bar {
  margin-top: 20px;
}

.weather__btn-delete {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border: 2px solid rgb(231, 50, 50);
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 5px #333;
  overflow: hidden;
  transition: 0.3s;
}
.weather__btn-delete:hover {
  background-color: rgb(245, 207, 207);
  transform: scale(1.2);
  box-shadow: 0 0 4px #111;
  transition: 0.3s;
}
.weather__btn-delete svg {
  color: rgb(231, 50, 50);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s;
}
.weather__btn-delete:focus {
  transition: 0.3s;
  transform: translateY(-2px);
}
</style>
