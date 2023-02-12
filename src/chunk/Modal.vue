<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible">
      <div class="window">
        <button>X</button>
        <h3>Ви впевнені, що хочете видалити?</h3>
        <div class="btns">
          <button class="ok-btn">Так</button>
          <button class="cancel-btn">Ні</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalComponent",

  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    open() {
      this.$emit.isVisible = true;
    },

    close() {
      this.$emit.isVisible = true;
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.popup-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 1;
}

.window {
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}
.btns {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.ok-btn {
  padding: 0.5em 1em;
  background-color: #d5eae7;
  color: #35907f;
  border: 2px solid #0ec5a4;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}

.cancel-btn {
  padding: 0.5em 1em;
  background-color: #fe6d73;
  color: #ffffff;
  border: 2px solid #ff3c42;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}
.ok-btn:active,
.cancel-btn:active {
  transition: 0.3s;
  transform: translateY(-3px);
}
</style>
