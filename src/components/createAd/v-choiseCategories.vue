<template>
  <ul class="list-group">
    <h5 class="mb-3">Выберите категорию</h5>
    <li
      class="list-group-item list-group-item-action cursor-pointer"
      :class="{ active: category.id === categoryID }"
      v-for="category of categories"
      :key="category.id"
      @click="choiseCategory(category.id)"
    >
      {{ category.title }}
    </li>
  </ul>
</template>

<script>
//vuex
import { mapActions } from "vuex";
export default {
  name: "choiseCategories",

  data: () => ({
    categoryID: "",
    categories: [],
  }),

  methods: {
    ...mapActions(["fetchCategories"]),
    choiseCategory(id) {
      this.categoryID = id;
      this.$emit("choise-category", id);
    },
  },

  async mounted() {
    this.categories = await this.fetchCategories();
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  width: 50%;
}

@media (max-width: 768px) {
  .list-group {
    width: 100%;
  }
}
</style>