<template>
  <div class="alert alert-dismissible fade show position-absolute end-0"
  :class="`alert-${type}`" 
  style="z-index: 1999"
  role="alert">
    <strong>{{title}}</strong>
    <div>{{text}}</div> 
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
export default {
    name: "appNotification",
    props: {
        title: {
            type: String,
            default: "Что-то пошло не так"
        },
        text: {
            type: String,
            default: "Попробуй перезагрузить страницу"
        },
        type: {
            type: String,
            default: "warning"
        }
    }
};
</script>

<style lang="scss" scoped>
</style>