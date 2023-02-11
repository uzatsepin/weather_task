<template>
  <div class="weather">
    <h3 class="weather__title">
      {{ weatherData.name }}, {{ weatherData.sys.country }}
    </h3>
    <div class="weather__wrapper">
      <img
        :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt="img"
      />
      <div class="weather__temp">
        <p class="weather__temp-item">{{ roundedTemperature }}&deg;</p>
        <p class="weather__temp-descr">
          {{ weatherData.weather[0].description }}
        </p>
      </div>
    </div>
    <div class="weather__info">
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/temperature-feels-like.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          {{ Math.round(weatherData.main.feels_like) }} &deg;
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/wind-svgrepo-com.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          {{ weatherData.wind.speed }} <span>km/h</span>
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/humidity-svgrepo-com.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">{{ weatherData.main.humidity }} %</p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/weather-rain-snow.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">12%</p>
      </div>
    </div>
    <div class="weather__bar">
      <BarComponent
        v-if="this.time.length > 0 && this.temp.length > 0"
        :time="this.time"
        :temp="this.temp"
      />
    </div>
  </div>
</template>

<script>
import BarComponent from "./BarComponent.vue";
export default {
  name: "WeatherComponent",
  components: { BarComponent },
  props: {
    weatherData: Object,
    city: Object,
    time: Object(),
    temp: Object(),
  },
  computed: {
    roundedTemperature() {
      return Math.round(this.weatherData.main.temp);
    },
  },
};
</script>

<style>
@import "../assets/styles/styles.css";
.weather {
  margin-top: 50px;
  padding: 30px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
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
  margin-top: 30px;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
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
}
.weather__bar {
  margin-top: 20px;
}
</style>
