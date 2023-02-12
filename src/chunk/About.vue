<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ModalComponent :isVisible="isModalVisible" @close="closeModal" />

    <button @click="openModal">modal</button>
  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
export default {
  data() {
    return {
      isModalVisible: false,
    };
  },
  components: {
    ModalComponent,
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style></style>
