<template>
  <ModalComponent
    :isVisible="isModalVisible"
    :nameToDelete="weatherData.name"
    :cardId="cardId"
    @close="closeModal"
    @cardDeleted="onCardDelete"
  />
  <!-- <div>
    <img src="../assets/img/Spinner-1s-200px.svg" alt="Loading" />
  </div> -->
  <div class="weather">
    <div class="weather__header" v-if="isHeaderVisible">
      <div class="weather__input">
        <InputTownComponent @citySelected="onCitySelected" />
      </div>
      <div class="weather__favourite">
        <button class="weather__favourite-btn" @click="onFavouriteClick">
          Зберегти
        </button>
      </div>
    </div>
    <div v-if="isWeatherDataVisible">
      <h3 class="weather__title">
        {{ weatherData.name }},

        {{ weatherData && weatherData.sys ? weatherData.sys.country : null }}
        <button
          class="weather__btn-delete"
          @click="openModal"
          v-if="!isStatic || isFavourite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </h3>
      <div class="weather__wrapper">
        <img
          :src="`http://openweathermap.org/img/wn/${
            weatherData && weatherData.weather
              ? weatherData.weather[0].icon
              : null
          }@4x.png`"
          alt="img"
        />
        <div class="weather__temp">
          <p class="weather__temp-item">
            {{
              Math.round(
                weatherData && weatherData.main ? weatherData.main.temp : null
              )
            }}&deg;
          </p>
          <p class="weather__temp-descr">
            {{
              weatherData && weatherData.weather
                ? weatherData.weather[0].description
                : null
            }}
          </p>
        </div>
      </div>
      <div class="weather__info">
        <div class="weather__info-item">
          <img
            class="weather__info-img"
            src="../assets/img/temperature.svg"
            alt="wind img"
          />
          <p class="weather__info-descr">
            <span>Відчувається як:</span>
            {{
              Math.round(
                weatherData && weatherData.main
                  ? weatherData.main.feels_like
                  : null
              )
            }}
            &deg;
          </p>
        </div>
        <div class="weather__info-item">
          <img
            class="weather__info-img"
            src="../assets/img/wind.svg"
            alt="wind img"
          />
          <p class="weather__info-descr">
            <span>Швидість вітру</span>
            <span class="weather__info-speed">km/h</span>
            {{
              weatherData && weatherData.wind ? weatherData.wind.speed : null
            }}
          </p>
        </div>
        <div class="weather__info-item">
          <img
            class="weather__info-img"
            src="../assets/img/humidity.svg"
            alt="wind img"
          />
          <p class="weather__info-descr">
            <span>Вологість</span>
            {{
              weatherData && weatherData.main ? weatherData.main.humidity : null
            }}
            %
          </p>
        </div>
        <div class="weather__info-item">
          <img
            class="weather__info-img"
            src="../assets/img/weather-overcast.svg"
            alt="wind img"
          />
          <p class="weather__info-descr">
            <span>Видимість</span
            >{{ weatherData ? weatherData.visibility : null }}
            м.
          </p>
        </div>
      </div>
      <div class="weather__bar">
        <BarComponent
          :time="weatherData.weatherTime"
          :temp="weatherData.weatherTemp"
        />
      </div>
      <h3 class="weather__item-descr" v-if="isStatic">
        *Інформація про погоду взята на основі вашої IP-адерси
      </h3>
    </div>
  </div>
</template>

<script>
import BarComponent from "./BarComponent.vue";
import { mapGetters } from "vuex";
import ModalComponent from "./ModalComponent.vue";
import InputTownComponent from "./InputTownComponent.vue";
import { getWeatherByCityFromInput } from "@/api/weatherAPI";

export default {
  name: "WeatherComponent",
  components: { BarComponent, ModalComponent, InputTownComponent },
  data() {
    return {
      isModalVisible: false,
      isLoading: true,
      selectedCity: {},
      isCitySelected: false,
    };
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
    isStatic: {
      type: Boolean,
      required: false,
    },
    cardId: {
      type: Number,
    },
    isFavourite: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["GET_WEATHER_CARDS_COUNT", "GET_WEATHER_CART_BY_ID"]),

    isHeaderVisible() {
      return !this.isStatic;
    },

    isWeatherDataVisible() {
      return this.isStatic ? true : this.isCitySelected;
    },
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    onCardDelete(cardId) {
      console.log(`cardid ${cardId}`);
      this.$emit("onCardDelete", cardId);
    },
    async onCitySelected(selectedCity) {
      this.selectedCity = selectedCity;
      let weatherData = (
        await getWeatherByCityFromInput(
          selectedCity.latitude,
          selectedCity.longitude
        )
      ).data;
      this.$store.commit("SET_WEATHER_BY_CARD_ID", {
        cardId: this.cardId,
        updatedWeatherData: weatherData,
      });
      this.isCitySelected = true;
    },

    onFavouriteClick() {
      const coordinates = {
        latitude: this.selectedCity.latitude,
        longitude: this.selectedCity.longitude,
      };

      if (localStorage.getItem("citiesCoord") === null) {
        const tempArr = [];
        tempArr.push(coordinates);
        localStorage.setItem("citiesCoord", JSON.stringify(tempArr));
      } else {
        let localStorageCoord = localStorage.getItem("citiesCoord");
        let localStorageCoordArray = JSON.parse(localStorageCoord);
        localStorageCoordArray.push(coordinates);
        localStorage.setItem(
          "citiesCoord",
          JSON.stringify(localStorageCoordArray)
        );
      }
    },
  },
};
</script>

<style>
@import "../assets/styles/styles.css";
@import "../assets/styles/stylesComponent/weatherStyle.css";
</style>
