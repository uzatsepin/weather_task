import { createApp } from "vue";
import { createStore } from "vuex";

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
      );
    },
  },
  actions: {
    // async GET_WEATHER_BY_IP({ commit }) {
    //   commit("SET_IS_CART_LOADING", true);
    //   const response = await getWeatherCardByIp();
    //   commit("SET_WEATHER_BY_IP", response.data);
    //   commit("SET_IS_CART_LOADING", false);
    // },
    // DELETE_WEATHER_FROM_CART({ commit }, name) {
    //   commit("REMOVE_CARD", name);
    // },
  },
  getters: {
    WEATHER_BY_IP(state) {
      return state.weatherCardByIp;
    },
    GET_WEATHER_CARDS(state) {
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
    GET_WEATHER_CARDS_COUNT: (state) => {
      return state.weatherCards.length;
    },
  },
});

export default store;

const app = createApp({});

app.use(store);
