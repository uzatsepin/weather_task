<template>
  <div class="input-weather">
    <label for="town" class="input-weather__title"
      >Введіть назву міста: (англійська)</label
    >
    <input
      class="input-weather__input"
      type="text"
      @input="updateMessage"
      v-model="inputValue"
      id="town"
    />
    <ul
      v-if="!isActive"
      class="input-weather-results"
      :class="{ hide: isActive }"
    >
      <li v-if="CITY_NAME.length < 1" class="input-weather__empty">
        <img src="../assets/img/Spinner-1s-200px.svg" alt="Loading" />
      </li>
      <li v-if="CITY_NAME.length === 0" class="input-weather__empty">
        Нічого не знайдено, повторіть спробу
      </li>
      <li
        class="input-weather-result"
        v-for="city in CITY_NAME"
        :key="city.name"
        @click="selectCity(city)"
      >
        <span>{{ city.name }}</span>
        <button @click="addWeatherToCard">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      inputValue: "",
      isActive: true,
    };
  },
  computed: {
    ...mapGetters(["CITY_NAME", "GET_CITY_INPUT_NAME", "GET_CITY_FOR_WEATHER"]),
    ...mapState({
      message: (state) => state.updateMessage,
    }),
  },
  methods: {
    ...mapActions([
      "GET_CITY_FROM_API",
      "GET_CLIENT_INFO",
      "GET_WEATHER_FROM_INPUT",
    ]),
    updateMessage(e) {
      this.$store.commit("UPDATE_INPUT", e.target.value);
      if (this.inputValue.length > 2) {
        this.debouncedGetCityFromAPI();
      }
    },
    debouncedGetCityFromAPI: _.debounce(function () {
      this.GET_CITY_FROM_API();
      this.isActive = false;
    }, 500),

    selectCity(city) {
      this.$store.commit("SET_CITY_FOR_WEATHER", city);
      this.inputValue = "";
      this.$store.commit("SET_CITY_NAME", []);
      this.isActive = true;
      this.GET_WEATHER_FROM_INPUT(city);
    },
    addWeatherToCard() {},
  },
};
</script>

<style>
@import "../assets/styles/stylesComponent/inputWeatherStyle.css";
</style>
