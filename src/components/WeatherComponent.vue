<template>
  <div class="weather">
    <h3 class="weather__title">
      {{ weatherData.name }}, {{ weatherData.sys.country }}
      <button>x</button>
    </h3>
    <div class="weather__wrapper">
      <img
        :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt="img"
      />
      <div class="weather__temp">
        <p class="weather__temp-item">
          {{ Math.round(this.weatherData.main.temp) }}&deg;
        </p>
        <p class="weather__temp-descr">
          {{ weatherData.weather[0].description }}
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
          {{ Math.round(weatherData.main.feels_like) }} &deg;
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
          {{ weatherData.wind.speed }}
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
          <span>Волог.</span> {{ weatherData.main.humidity }} %
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/weather-overcast.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Видимість</span>{{ weatherData.visibility }} м.
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
    ...mapGetters(["GET_WEATHER_TIME", "GET_WEATHER_TEMP"]),
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
}
.weather__bar {
  margin-top: 20px;
}
.weather__info {
  font-size: 12px;
  text-align: left;
}
.weather__info-descr span {
  display: block;
  font-size: 12px;
  color: #bfbfc1;
  text-align: center;
  margin-bottom: 5px;
}
</style>
