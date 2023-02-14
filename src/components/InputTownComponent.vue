<template>
  <div class="input-weather">
    <input
      class="input-weather__input"
      type="text"
      @input="updateMessage"
      v-model="inputValue"
      id="town"
    />
    <ul
      v-if="isActive"
      class="input-weather-results"
      :class="{ hide: !isActive }"
    >
      <li class="input-weather__empty" v-if="isLoading">
        <img src="../assets/img/Spinner-1s-200px.svg" alt="Loading" />
      </li>
      <li class="input-weather__empty" v-if="false">
        Нічого не знайдено, повторіть спробу
      </li>
      <li
        class="input-weather-result"
        v-for="city in citiesList"
        :key="city.name"
        @click="selectCity(city)"
      >
        <span>{{ city.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";
import { getCitiesByInput } from "@/api/citiesAPI.js";
export default {
  data() {
    return {
      inputValue: "",
      isActive: false,
      citiesList: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["GET_IS_CITY_LOADING", "GET_CITY_INPUT_NAME"]),
  },
  methods: {
    ...mapActions(["GET_CITY_FROM_API", "GET_WEATHER_BY_CITY_FROM_INPUT"]),
    updateMessage() {
      if (this.inputValue.length > 2) {
        this.debouncedgetCitiesByInputFromAPI();
      }
    },
    async getCitiesList() {
      this.citiesList = await getCitiesByInput(this.inputValue);
      this.isActive = true;
    },
    selectCity(city) {
      this.$emit("citySelected", city);
      this.citiesList = [];
      this.isActive = false;
    },
    debouncedgetCitiesByInputFromAPI: _.debounce(function () {
      this.isLoading = true;
      this.getCitiesList();
      this.isActive = false;
      this.isLoading = false;
    }, 500),
  },
};
</script>

<style>
@import "../assets/styles/stylesComponent/inputWeatherStyle.css";
</style>
