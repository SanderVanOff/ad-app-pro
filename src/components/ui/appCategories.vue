<template>
  <div
    class="categories-group btn-group pb-3 d-flex"
    role="group"
    aria-label="Basic outlined example"
  >
    <button
      v-for="category of categories"
      :key="category.id"
      :ref="`category${category.id}`"
      @click="$emit('changeCategory', category.id), getRefs(category.id)"
      type="button"
      class="categories-group__btn btn btn-outline-dark"
      style="font-size: 0.7rem !important"
    >
      {{ category.title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "appCategories",
  props: {
    categories: {
      type: Array,
    },
  },

  methods: {
    getRefs(id = '000') {

        let butRef = `category${id}`;

        Object.keys(this.$refs).forEach((key) => {
          this.$refs[key][0].classList.remove("active");
        });
        this.$refs[butRef][0].classList.add("active");
    },
  },

  mounted() {
    if(this.$refs.category001) {
     this.getRefs(this.$route.params.id)
    }
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .categories-group {
    flex-wrap: wrap;

    &__btn {
      border-radius: 0.25rem !important;
      margin: 5px;
    }
  }
}
</style>