<template>
  <transition-group name="list" tag="div" class="notify-list position-fixed end-0" style="z-index: 1999">

    <div
    v-for="notify of notifications"
    :key="notify.id"
      class="alert alert-dismissible fade show "
      :class="`alert-${notify.type}`"
      style="z-index: 1999; width: 300px;"
      role="alert"
    >
      <strong>{{ notify.title }}</strong>
      <div>{{ notify.text }}</div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: "appNotification",
  props: {
    notifications: {
      type: Array,
      default: () => ([{
        title: "Что-то пошло не так",
        text: "Попробуй перезагрузить страницу",
        type: "warning",
      }]),
    },
  },
};
</script>

<style lang="scss" scoped>

</style>