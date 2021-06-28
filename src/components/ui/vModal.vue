<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalId: {
      type: String,
      default: "modal",
    },
    classModal: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
#modalImageId .modal-dialog {
  max-width: 100% !important;
  margin: 0 !important;
}
</style>