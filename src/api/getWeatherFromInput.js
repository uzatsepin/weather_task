import axios from "axios";

export const getWeatherFromInput = async ({ commit }) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.cityForWeather.latitude}&lon=${this.state.cityForWeather.longitude}&appid=a261f3e12828029bf88712debd81e345&units=metric`
  );
  commit("SET_WEATHER_CART", response.data);
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${response.data.id}&appid=a261f3e12828029bf88712debd81e345&units=metric`
    )
    .then((response) => {
      const timeTempObjectsArray = Array(response.data.list)[0];
      const times = timeTempObjectsArray.map((x) => x.dt_txt).slice(0, 7);
      const timeResult = times.map((date) => {
        return date.split(" ")[1].split(":").slice(0, 2).join(":");
      });
      commit("SET_WEATHER_TIME", timeResult);
      const timesLength = this.state.weatherTime.length;
      const tempResult = timeTempObjectsArray
        .map((x) => Math.round(x.main.temp))
        .slice(0, timesLength);
      commit("SET_WEATHER_TEMP", tempResult);
    })
    .catch((error) => console.log(error));
};

// getWeatherFromInput({ commit });
// import { getWeatherFromInput } from "./weather.service";
