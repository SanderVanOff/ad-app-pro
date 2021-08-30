<template>
  <div class="overlay">
    <vue-loaders-line-scale color="black" scale="1.2" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.overlay {
  height: calc(100vh - 3.5rem);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>