<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-light
      bg-light
      shadow
      rounded-bottom
      fixed-top
    "
  >
    <div class="container-fluid d-flex justify-contetn-between">
    
      <router-link
        v-if="$route.name !== 'MessageItem'"
        :to="{ name: 'Home' }"
        class="navbar-brand d-flex align-items-center"
      >
        <i class="fas fa-store me-2"></i>
        <span>ОБЪЯВИТУС</span>
      </router-link>

      <button
        v-else
        type="button"
        class="btn btn-outline-dark me-2"
        @click="$router.back()"
      >
        <i class="fs-4 fas fa-long-arrow-alt-left"></i>
      </button>

      <div class="buttons-group">
        <router-link
          class="btn btn-success me-2"
          tag="button"
          :to="{ name: 'createAd' }"
        >
          <span class="btn-text">Разместить объявление</span>
          <i class="btn-icon fas fa-plus-circle"></i>
        </router-link>

        <button class="btn btn-dark" @click="logout">
          <span class="btn-text">Выйти</span>
          <i class="btn-icon fas fa-door-open"></i>
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

<style lang="scss" scoped>
.btn-text {
  margin-right: 0.5rem;
}

@media (max-width: 576px) {
  .btn-text {
    display: none;
    margin-right: 0;
  }
}
</style>