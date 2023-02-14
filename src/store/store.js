import { createApp } from "vue";
import { createStore } from "vuex";
<<<<<<< HEAD

const store = createStore({
  state: {
    weatherCardsCount: 0,
    weatherCards: [],
    maxWeatherCardsCount: 5,
  },
  mutations: {
    SET_CITIES_LIST(state, citiesList) {
      state.citiesList = citiesList;
    },
    // SET_WEATHER_BY_IP: (state, weather) => {
    //   state.weatherCardByIp = weather;
    // },
    ADD_WEATHER_CARD: (state, payload) => {
      state.weatherCardsCount++;
      const card = {
        id: state.weatherCardsCount,
        weatherData: payload.weatherData,
      };
      state.weatherCards.push(card);
    },
    SET_WEATHER_BY_CARD_ID: (state, payload) => {
      const weatherCard = state.weatherCards.find(
        (weatherCard) => weatherCard.id === payload.cardId
      );
      weatherCard.weatherData = payload.updatedWeatherData;
    },
    REMOVE_CARD: (state, payload) => {
      state.weatherCards = state.weatherCards.filter(
        (card) => card.id !== payload.cardId
=======
import { getCity } from "../api/getCityApi.js";
import getWeatherByIp from "../api/getWeatherByIp.js";
import getWeatherFromInput from "@/api/getWeatherFromInput.js";

const store = createStore({
  state: {
    cityNameFromInput: "",
    cityName: "",
    cityForWeather: "",
    weatherByIp: [],
    weatherCards: [],
    isWeatherCardLoading: false,
    isCitiesLoading: false,
    emptyCard: [],
  },
  mutations: {
    UPDATE_INPUT(state, inputText) {
      state.cityNameFromInput = inputText;
    },
    SET_CITY_NAME(state, cityName) {
      state.cityName = cityName;
    },
    SET_CITY_FOR_WEATHER: (state, city) => {
      state.cityForWeather = city;
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
>>>>>>> main
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
<<<<<<< HEAD
    // async GET_WEATHER_BY_IP({ commit }) {
    //   commit("SET_IS_CART_LOADING", true);
    //   const response = await getWeatherCardByIp();
    //   commit("SET_WEATHER_BY_IP", response.data);
    //   commit("SET_IS_CART_LOADING", false);
    // },
    // DELETE_WEATHER_FROM_CART({ commit }, name) {
    //   commit("REMOVE_CARD", name);
    // },
=======
    async GET_CITY_FROM_API({ commit, state }) {
      commit("SET_IS_CITY_LOADING", true);
      const cityName = state?.cityNameFromInput;
      const response = await getCity(cityName);
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
        this.state.cityForWeather.latitude,
        this.state.cityForWeather.longitude
      );
      commit("SET_WEATHER_CART", response.data);
      commit("SET_IS_CART_LOADING", false);
    },
    DELETE_WEATHER_FROM_CART({ commit }, name) {
      commit("REMOVE_WEATHER_FROM_CART", name);
    },
>>>>>>> main
  },
  getters: {
    WEATHER_BY_IP(state) {
      return state.weatherCardByIp;
    },
<<<<<<< HEAD
    GET_WEATHER_CARDS(state) {
=======
    GET_CITY_FOR_WEATHER(state) {
      return state.cityForWeather;
    },
    GET_WEATHER_CART(state) {
>>>>>>> main
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
<<<<<<< HEAD
    GET_WEATHER_CARDS_COUNT: (state) => {
      return state.weatherCards.length;
=======
    GET_IS_CITY_LOADING: (state) => {
      return state.isCitiesLoading;
    },
    GET_IS_CART_LOADING: (state) => {
      return state.isWeatherCardLoading;
>>>>>>> main
    },
  },
});

export default store;

const app = createApp({});

app.use(store);
