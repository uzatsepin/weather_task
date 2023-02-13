<template>
  <div class="favourites">
    <h2 class="favourites__title">Тут ваші будуть обрані картки з погодою</h2>
    <div class="favourites__inner">
      <div
        class="favourites__cards"
        v-for="card in GET_WEATHER_CART"
        :key="card.id"
      >
        <WeatherComponent v-if="card" :weatherData="card" />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherComponent from "@/components/WeatherComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "AboutView",
  components: {
    WeatherComponent,
  },
  computed: {
    ...mapGetters(["GET_WEATHER_CART"]),
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
