import { createApp } from "vue";
import { createStore } from "vuex";
import { getCity } from "../api/getCityApi.js";
import getWeatherByIp from "../api/getWeatherByIp.js";
import getWeatherFromInput from "@/api/getWeatherFromInput.js";

const store = createStore({
  state: {
    cityInput: "",
    citiesList: "",
    selectedCity: "",
    weatherByIp: [],
    weatherCards: [],
    isWeatherCardLoading: false,
    isCitiesLoading: false,
    emptyCard: [],
  },
  mutations: {
    UPDATE_INPUT(state, inputText) {
      state.cityInput = inputText;
    },
    SET_CITY_NAME(state, citiesList) {
      state.citiesList = citiesList;
    },
    SET_CITY_FOR_WEATHER: (state, city) => {
      state.selectedCity = city;
    },
    SET_WEATHER_BY_IP: (state, weather) => {
      state.weatherByIp = weather;
    },
    SET_WEATHER_CART: (state, card) => {
      state.weatherCards.push(card);
    },
    SET_WEATHER_TIME: (state, time) => {
      state.weatherTime = time;
    },
    SET_WEATHER_TEMP: (state, temp) => {
      state.weatherTemp = temp;
    },
    REMOVE_WEATHER_FROM_CART: (state, name) => {
      state.weatherCards = state.weatherCards.filter(
        (element) => element.name !== name
      );
    },
    SET_IS_CITY_LOADING: (state, status) => {
      state.isCitiesLoading = status;
    },
    SET_IS_CART_LOADING: (state, status) => {
      state.isWeatherCardLoading = status;
    },
  },
  actions: {
    async GET_CITY_FROM_API({ commit, state }) {
      commit("SET_IS_CITY_LOADING", true);
      const citiesList = state?.cityInput;
      const response = await getCity(citiesList);
      commit("SET_CITY_NAME", response);
      commit("SET_IS_CITY_LOADING", false);
    },
    async GET_WEATHER_BY_IP({ commit }) {
      commit("SET_IS_CART_LOADING", true);
      const response = await getWeatherByIp.getWeatherByIP();
      commit("SET_WEATHER_BY_IP", response.data);
      commit("SET_IS_CART_LOADING", false);
    },
    async GET_WEATHER_FROM_INPUT({ commit }) {
      commit("SET_IS_CART_LOADING", true);
      const response = await getWeatherFromInput.getWeatherFromInput(
        this.state.selectedCity.latitude,
        this.state.selectedCity.longitude
      );
      commit("SET_WEATHER_CART", response.data);
      commit("SET_IS_CART_LOADING", false);
    },
    DELETE_WEATHER_FROM_CART({ commit }, name) {
      commit("REMOVE_WEATHER_FROM_CART", name);
    },
  },
  getters: {
    CITY_NAME(state) {
      return state.citiesList;
    },
    WEATHER_BY_IP(state) {
      return state.weatherByIp;
    },
    GET_CITY_INPUT_NAME(state) {
      return state.cityInput;
    },
    GET_CITY_FOR_WEATHER(state) {
      return state.selectedCity;
    },
    GET_WEATHER_CART(state) {
      return state.weatherCards;
    },
    GET_WEATHER_TIME: (state, long, lat) => {
      return state.weatherCards.filter(
        (x) => x.latitude == lat && x.longitude == long
      )[0];
    },
    GET_WEATHER_TEMP: (state, long, lat) => {
      return state.weatherCards.filter(
        (x) => x.latitude == lat && x.longitude == long
      )[0];
    },
    GET_IS_CITY_LOADING: (state) => {
      return state.isCitiesLoading;
    },
    GET_IS_CART_LOADING: (state) => {
      return state.isWeatherCardLoading;
    },
  },
});

export default store;

const app = createApp({});

app.use(store);
