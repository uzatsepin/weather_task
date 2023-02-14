<template>
  <div class="favourites">
    <h2 class="favourites__title">Тут ваші будуть обрані картки з погодою</h2>
    <div class="favourites__inner">
      <WeatherComponent
        v-for="data in weatherData"
        :weatherData="data"
        :key="data.name"
        :isStatic="true"
        :isFavourite="true"
      />
    </div>
  </div>
</template>

<script>
import { getWeatherByCityFromInput } from "@/api/weatherAPI";
import WeatherComponent from "@/components/WeatherComponent.vue";
export default {
  data() {
    return {
      coorinatesList: [],
      weatherData: [],
    };
  },
  name: "AboutView",
  components: {
    WeatherComponent,
  },
  async created() {
    this.coorinatesList = JSON.parse(localStorage.getItem("citiesCoord"));

    this.coorinatesList?.forEach(async (coorinates) => {
      this.weatherData.push(
        (
          await getWeatherByCityFromInput(
            coorinates.latitude,
            coorinates.longitude
          )
        ).data
      );
    });
  },
};
</script>

<style>
.favourites__inner {
  display: flex;
  justify-content: center;
  gap: 0 20px;
  flex-wrap: wrap;
}
.favourites__title {
  text-align: center;
  margin: 20px 0;
}
</style>
