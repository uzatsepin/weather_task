<template>
  <div class="autocomplete">
    <input
      class="autocomplete__input"
      type="text"
      v-model="inputValue"
      @input="fetchCities"
    />
    <ul v-if="cityData.length" class="autocomplete-results">
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li v-for="city in cityData" :key="city.id" class="autocomplete-result">
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputValue: "",
      cityData: [],
    };
  },
  methods: {
    async fetchCities() {
      try {
        const name = this.inputValue;
        const response = await axios({
          method: "GET",
          url: "https://api.api-ninjas.com/v1/city?name=" + name,
          headers: { "X-Api-Key": "tv8o567aIuoI+73uheVF5w==L2l20V7RfeDmwVBz" },
        });
        this.cityData = response.data;
      } catch (error) {
        console.error("Error: ", error);
      }
    },
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
  height: 120px;
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
