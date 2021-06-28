<template>
  <div id="app">
    <component :is="`${layout}-layout`"></component>
  </div>
</template>

<script>
//components
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export default {
  name: "App",
  components: { MainLayout, EmptyLayout },
  computed: {
    layout() {
      return this.$route.meta.layout || "empty";
    },
  },
};
</script>

<style>
</style>
