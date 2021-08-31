<template>
  <div class="main-layout">
    <app-navbar></app-navbar>
    <main class="main position-relative pt-5 mt-2">
      <app-sidebar v-if="$route.name !== 'MessageItem'"></app-sidebar>
      <router-view />
    </main>
  </div>
</template>

<script>
//components
import AppNavbar from "@/components/appNavbar.vue";
import AppSidebar from "@/components/appSidebar.vue";

export default {
  name: "MainLayout",
  components: {
    AppNavbar,
    AppSidebar,
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 11fr;
}

@media (max-width:576px) {
  .main {
  display: grid;
  grid-template-rows: 2fr;
  grid-template-columns: 12fr;
}
}
</style>