<template>
  <section class="bg-body py-3 position-relative">
    <div class="container-fluid">
      <h3 class="title mb-3" v-if="title">
        <span class="icon"><i class="fs-4" :class="icon"></i></span>
        {{ title }}
      </h3>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style>
</style>