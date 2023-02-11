<template>
  <div></div>
  <!-- <div>
    <input
      type="text"
      v-model="searchTerm"
      @input="searchCities"
      @keydown="keyNavigation"
    />
    <ul v-if="filteredCities.length">
      <li
        v-for="(city, index) in filteredCities"
        :class="{ selected: index === selectedIndex }"
        @click="selectCity(city)"
        @mouseover="updateSelectedIndex(index)"
        ref="cityList"
        :key="city"
      >
        {{ city }}
      </li>
    </ul>
    {{ filteredCities }}
  </div> -->
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      searchTerm: "",
      cities: ["New York", "London", "Paris", "Berlin", "Tokyo", "Sydney"],
      filteredCities: [],
      selectedIndex: -1,
    };
  },
  methods: {
    searchCities() {
      this.filteredCities = this.cities.filter((city) =>
        city.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.selectedIndex = -1;
    },
    selectCity(city) {
      this.searchTerm = city;
      this.filteredCities = [];
    },
    updateSelectedIndex(index) {
      this.selectedIndex = index;
    },
    keyNavigation(event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (this.selectedIndex < this.filteredCities.length - 1) {
          this.selectedIndex++;
        }
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
      }
      if (event.key === "Enter" && this.selectedIndex !== -1) {
        event.preventDefault();
        this.searchTerm = this.filteredCities[this.selectedIndex];
        this.filteredCities = [];
      }
    },
  },
};
</script>

<style>
ul {
}

li {
}
</style>
