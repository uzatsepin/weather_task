import { createApp } from "vue";
import { createStore } from "vuex";
import { getCity } from "../api/getCityApi.js";
import getWeatherByIp from "../api/getWeatherByIp.js";
import axios from "axios";

const store = createStore({
  state: {
    cityNameFromInput: "",
    cityName: "",
    cityForWeather: "",
    weatherByIp: [],
    cardsWeather: [],
    // weatherTime: [],
    // weatherTemp: [],
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
      state.cardsWeather.push(card);
    },
    SET_WEATHER_TIME: (state, time) => {
      state.weatherTime = time;
    },
    SET_WEATHER_TEMP: (state, temp) => {
      state.weatherTemp = temp;
    },
    REMOVE_WEATHER_FROM_CART: (state, name) => {
      state.cardsWeather = state.cardsWeather.filter(
        (element) => element.name !== name
      );
    },
  },
  actions: {
    async GET_CITY_FROM_API({ commit, state }) {
      const cityName = state?.cityNameFromInput;
      const response = await getCity(cityName);
      commit("SET_CITY_NAME", response);
    },
    async GET_WEATHER_BY_IP({ commit }) {
      await getWeatherByIp.getWeatherByIP({ commit });
    },
    async GET_WEATHER_FROM_INPUT({ commit }) {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.cityForWeather.latitude}&lon=${this.state.cityForWeather.longitude}&appid=a261f3e12828029bf88712debd81e345&units=metric`
      );
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?id=${weatherResponse.data.id}&appid=a261f3e12828029bf88712debd81e345&units=metric`
        )
        .then((response) => {
          const timeTempObjectsArray = Array(response.data.list)[0];
          const times = timeTempObjectsArray.map((x) => x.dt_txt).slice(0, 7);
          const timeResult = times.map((date) => {
            return date.split(" ")[1].split(":").slice(0, 2).join(":");
          });
          console.log(timeResult);
          weatherResponse.data.weatherTime = timeResult;
          const tempResult = timeTempObjectsArray
            .map((x) => Math.round(x.main.temp))
            .slice(0, 7);
          console.log(tempResult);
          weatherResponse.data.weatherTemp = tempResult;
          // commit("SET_WEATHER_TEMP", tempResult);
          commit("SET_WEATHER_CART", weatherResponse.data);
        })
        .catch((error) => console.log(error));
    },
    DELETE_WEATHER_FROM_CART({ commit }, name) {
      commit("REMOVE_WEATHER_FROM_CART", name);
    },
  },
  getters: {
    CITY_NAME(state) {
      return state.cityName;
    },
    WEATHER_BY_IP(state) {
      return state.weatherByIp;
    },
    GET_CITY_INPUT_NAME(state) {
      return state.cityNameFromInput;
    },
    GET_CITY_FOR_WEATHER(state) {
      return state.cityForWeather;
    },
    GET_WEATHER_CART(state) {
      return state.cardsWeather;
    },
    GET_WEATHER_TIME: (state, long, lat) => {
      return state.cardsWeather.filter(
        (x) => x.latitude == lat && x.longitude == long
      )[0];
    },
    GET_WEATHER_TEMP: (state, long, lat) => {
      return state.cardsWeather.filter(
        (x) => x.latitude == lat && x.longitude == long
      )[0];
    },
  },
});

export default store;

const app = createApp({});

app.use(store);
