<template>
  <div class="empty text-center">
    <p class="empty__text fs-3">Объявлений пока нет!</p>
    <p class="empty__text fs-3">Создадим?</p>

    <router-link
      class="btn btn-success me-2"
      tag="button"
      :to="{ name: 'createAd' }"
    >
      <span class="btn-text">Разместить объявление</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>