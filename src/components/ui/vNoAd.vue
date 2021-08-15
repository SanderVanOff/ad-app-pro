<template>
  <div class="empty text-center">
    <p class="empty__text fs-3">{{title}}</p>
    <p class="empty__text fs-3">{{ text }}</p>

    <router-link
      class="btn btn-success me-2"
      tag="button"
      :to="{ name: btnLink }"
    >
      <span class="btn-text">{{ btnText }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "vNoAd",
  props: {
    title: {
      type: String,
      default: "Объявлений пока нет!"
    },
    text: {
      type: String,
      default: "Создадим?",
    },

    btnText: {
      type: String,
      default: "Разместить объявление"
    },

    btnLink: {
      type: String,
      default: "createAd"
    }
  },
};
</script>

<style>
</style>