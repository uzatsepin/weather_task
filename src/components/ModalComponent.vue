<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible">
      <div class="popup__window">
        <div class="popup__content" @keyup.esc="closeModal">
          <div class="popup__inner">
            <button class="popup__btn" @click="closeModal">X</button>
            <h3 class="popup__title">
              Ви впевнені, що хочете видалити місто
              {{ weatherData ? weatherData.name : null }} ?
            </h3>
          </div>
          <div class="popup__btns">
            <button class="popup__ok-btn" @click="emitDeleteWeatherFromCart()">
              Так
            </button>
            <button class="popup__cancel-btn" @click="closeModal">Ні</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ModalComponent",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    weatherData: {
      type: Object,
      required: true,
    },
  },
  ...mapGetters(["GET_WEATHER_CART"]),
  methods: {
    emitDeleteWeatherFromCart() {
      this.$emit("deleteWeatherFromCart");
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style>
@import "../assets/styles/stylesComponent/popupStyle.css";
</style>
