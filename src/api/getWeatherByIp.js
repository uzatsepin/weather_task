import axios from "axios";

export default {
  async getWeatherByIP() {
    try {
      const ipResponse = await axios.get("https://ipapi.co/json/");
      const lat = ipResponse.data.latitude;
      const lon = ipResponse.data.longitude;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_WEATHER}&units=metric`
      );
      return await axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?id=${weatherResponse.data.id}&appid=${process.env.VUE_APP_WEATHER}&units=metric`
        )
        .then((response) => {
          const date = new Date();
          const currentDate = date.getUTCDate();
          const timeTempObjectsArray = Array(response.data.list)[0].filter(
            (x) => new Date(x.dt_txt).getUTCDate() === currentDate
          );
          if (!timeTempObjectsArray.length) {
            throw new Error("No data for current day");
          }
          const times = timeTempObjectsArray.map((x) => x.dt_txt).slice(0, 10);
          const timeResult = times.map((time) => {
            return time.split(" ")[1].split(":").slice(0, 2).join(":");
          });
          weatherResponse.data.weatherTime = timeResult;
          const tempResult = timeTempObjectsArray
            .map((x) => Math.round(x.main.temp))
            .slice(0, 10);
          weatherResponse.data.weatherTemp = tempResult;
          return weatherResponse;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  },
};
