import axios from "axios";

export default {
  async getWeatherByIP({ commit }) {
    try {
      const ipResponse = await axios.get("https://ipapi.co/json/");
      const lat = ipResponse.data.latitude;
      const lon = ipResponse.data.longitude;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a261f3e12828029bf88712debd81e345&units=metric`
      );
      commit("SET_WEATHER_BY_IP", weatherResponse.data);
    } catch (error) {
      console.error(error);
    }
  },
};
