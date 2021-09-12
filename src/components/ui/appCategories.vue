<template>
  <!-- <div
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
  </div> -->
  <div class="filter col-12 col-sm-6  col-md-4 mb-3">
  <select class="form-select" @change="$emit('changeCategory', filterCategory)" v-model="filterCategory">
    <option selected disabled>Выберите категорию</option>
    <option :value="category.id" v-for="category of categories"
    :key="category.id"
    >{{category.title}}</option>
  </select>
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

  data: () => ({
    filterCategory: '000'
  }),

  methods: {
    changeCategory(){
      console.log(1)
    }
  }

};
</script>

<style lang="scss" scoped>

</style>