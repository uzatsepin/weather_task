<template>
  <div class="home">
    {{ weatherData }}
    <InputAutocomplete @cityData="receiveCityData" />
    <div class="weather__view">
      <template v-if="weatherData != undefined">
        <WeatherComponent
          :weatherData="weatherData"
          :time="time"
          :temp="temp"
        />
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
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.city.latitude}&lon=${this.city.longitude}&appid=a261f3e12828029bf88712debd81e345&units=metric`
        )
        .then((response) => {
          this.weatherData = response.data;
          axios
            .get(
              `http://api.openweathermap.org/data/2.5/forecast?id=${response.data.id}&appid=a261f3e12828029bf88712debd81e345&units=metric`
            )
            .then((response) => {
              const timeTempObjectsArray = Array(response.data.list)[0];

              const times = timeTempObjectsArray
                .map((x) => x.dt_txt)
                .slice(0, 7);

              this.time = times.map((date) => {
                return date.split(" ")[1].split(":").slice(0, 2).join(":");
              });
              console.log(this.time);

              const timesLength = this.time.length;

              this.temp = timeTempObjectsArray
                .map((x) => Math.round(x.main.temp))
                .slice(0, timesLength);
              console.log(this.temp);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.error(error);
        });
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
  computed: {
    env() {
      return process.env;
    },
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
