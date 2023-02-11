<template>
  <div class="autocomplete">
    <input
      class="autocomplete__input"
      type="text"
      v-model="inputValue"
      @input="debouncedFetchCities"
      @click="showLog"
    />
    <ul v-if="cityData.length" class="autocomplete-results">
      <li class="autocomplete-result" v-if="isLoading">Loading results...</li>
      <li
        v-for="city in cityData"
        :key="city.id"
        class="autocomplete-result"
        @click="selectCity(city)"
      >
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
  data() {
    return {
      inputValue: "",
      selectedCity: "",
      cityData: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchCities() {
      try {
        this.isLoading = true;
        const name = this.inputValue;
        const response = await axios({
          method: "GET",
          url: `https://api.api-ninjas.com/v1/city?name=${name}&limit=10`,
          headers: { "X-Api-Key": "tv8o567aIuoI+73uheVF5w==L2l20V7RfeDmwVBz" },
        });
        this.cityData = response.data;

        this.isLoading = false;
      } catch (error) {
        console.error("Error: ", error);
      }
    },
    selectCity(city) {
      this.selectedCity = city;
      this.$emit("cityData", this.selectedCity);
      this.inputValue = this.selectedCity.name;
      this.cityData = [];
      this.inputValue = "";
    },
  },
  created() {
    this.debouncedFetchCities = _.debounce(this.fetchCities, 1000);
  },
};
</script>

<style>
.autocomplete {
  position: relative;
  font-size: 18px;
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
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
