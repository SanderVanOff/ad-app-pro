<template>
  <div class="main-layout">
    <app-navbar></app-navbar>
    <main class="main position-relative pt-5 mt-2">
      <app-sidebar></app-sidebar>
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

<style>
</style>