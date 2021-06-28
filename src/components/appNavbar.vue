<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light shadow rounded-bottom fixed-top"
  >
    <div class="container-fluid d-flex justify-contetn-between">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <i class="fas fa-store me-2"></i>
        <span>ОБЪЯВИТУС</span>
      </a>

      <div class="buttons-group">
        <router-link
          class="btn btn-success me-2"
          tag="button"
          :to="{ name: 'createAd' }"
        >
          <span class="btn-text">Разместить объявление</span>
          <i class="fas fa-plus-circle ms-2"></i>
        </router-link>

        <button class="btn btn-dark" @click="logout">
          <span class="btn-text">Выйти</span>
          <i class="fas fa-door-open ms-2"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      // this.$store.dispatch("logoutUset");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>