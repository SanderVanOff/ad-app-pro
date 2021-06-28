<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "EmptyLayout",
};
</script>

<style lang="scss" scoped>
.empty-layout {
  height: 100vh;
  background: linear-gradient(141deg, #00535a, #006a8d 71%, #0061a7);
}
</style>