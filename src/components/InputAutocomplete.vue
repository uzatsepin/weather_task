<template>
  <div class="autocomplete">
    <label for="town" class="autocomplete__title"
      >Введіть назву міста: (англійська)</label
    >
    <input
      class="autocomplete__input"
      type="text"
      @input="updateMessage"
      v-model="inputValue"
      id="town"
    />
    <ul
      v-if="!isActive"
      class="autocomplete-results"
      :class="{ hide: isActive }"
    >
      <li v-if="CITY_NAME.length < 1" class="autocomplete__empty">
        Нічого не знайдено, повторіть спробу
      </li>
      <li
        class="autocomplete-result"
        v-for="city in CITY_NAME"
        :key="city.name"
        @click="selectCity(city)"
      >
        <span>{{ city.name }}</span>
        <button @click="addWeatherToCard">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      inputValue: "",
      isActive: true,
    };
  },
  computed: {
    ...mapGetters(["CITY_NAME", "GET_CITY_INPUT_NAME", "GET_CITY_FOR_WEATHER"]),
    ...mapState({
      message: (state) => state.updateMessage,
    }),
  },
  methods: {
    ...mapActions([
      "GET_CITY_FROM_API",
      "GET_CLIENT_INFO",
      "GET_WEATHER_FROM_INPUT",
    ]),
    updateMessage(e) {
      this.$store.commit("UPDATE_INPUT", e.target.value);
      if (this.inputValue.length > 2) {
        this.debouncedGetCityFromAPI();
      }
    },
    debouncedGetCityFromAPI: _.debounce(function () {
      this.GET_CITY_FROM_API();
      this.isActive = false;
    }, 500),

    selectCity(city) {
      this.$store.commit("SET_CITY_FOR_WEATHER", city);
      this.inputValue = city.name;
      this.isActive = true;
      this.GET_WEATHER_FROM_INPUT(city);
    },
    addWeatherToCard() {},
  },
};
</script>

<style>
.autocomplete {
  position: relative;
  font-size: 18px;
}
.autocomplete__title {
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
}
.autocomplete__input {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  width: 300px;
  padding: 15px 10px 15px 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
}

.autocomplete__input input:focus {
  border: 1px solid #e5e7eb;
}

.autocomplete-results {
  padding: 10px;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 240px;
  overflow: auto;
  width: 28%;
  border-radius: 0.5rem;
  border-top: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
}

.autocomplete__empty {
  text-align: center;
  padding-top: 30px;
}

.hide {
  display: none;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.autocomplete-result button {
  cursor: pointer;
  background-color: #023047;
  border: 1px solid #023047;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 5px 10px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  touch-action: manipulation;
}

.autocomplete-result button:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
  transform: translateY(-2px);
  background-color: #003566;
  border: 1px solid #003566;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
