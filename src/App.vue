<template>
  <div class="container">
    <div class="logo">
      <p class="logo__text">WeatherApp ☀️</p>
    </div>
    <nav class="nav">
      <router-link class="nav__link" to="/">Головна</router-link>
      <router-link class="nav__link" to="/about"
        >Обране
        <span v-if="GET_WEATHER_CART.length >= 1"
          >({{ GET_WEATHER_CART.length }})</span
        ></router-link
      >
    </nav>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GET_WEATHER_CART"]),
  },
};
</script>

<style>
@import "./assets/styles/styles.css";
.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}
.logo {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 28px;
}
.logo__text {
  color: #023047;
}
.nav {
  overflow: hidden;
  margin-bottom: -2px;
}
.nav ul {
  list-style-type: none;
  margin-left: 20px;
}
.nav__link {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: all 0.1s ease-in-out;
  border: 1px solid #e1e1e1;
  border-right: none;
  background-color: #003566;
  border-radius: 0 0 0 0;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.nav__link:last-child {
  border-right: 1px solid #e1e1e1;
}
.nav__link:hover {
  background-color: #fb8500;
  color: #fff;
}
.router-link-exact-active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}
.main {
  padding: 30px;
  border: 1px solid #e1e1e1;
  border-radius: 0px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
