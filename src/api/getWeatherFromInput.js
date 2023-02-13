import axios from "axios";

export default {
  async getWeatherFromInput(latitude, longitude) {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a261f3e12828029bf88712debd81e345&units=metric`
      );
      return await axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?id=${weatherResponse.data.id}&appid=a261f3e12828029bf88712debd81e345&units=metric`
        )
        .then((response) => {
          const timeTempObjectsArray = Array(response.data.list)[0];
          const times = timeTempObjectsArray.map((x) => x.dt_txt).slice(0, 9);
          const timeResult = times.map((date) => {
            return date.split(" ")[1].split(":").slice(0, 2).join(":");
          });
          weatherResponse.data.weatherTime = timeResult;
          const tempResult = timeTempObjectsArray
            .map((x) => Math.round(x.main.temp))
            .slice(0, 9);
          weatherResponse.data.weatherTemp = tempResult;
          return weatherResponse;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  },
};
