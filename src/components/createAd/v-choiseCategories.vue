<template>
  <ul class="list-group w-50">
  <h5 class="mb-3">Выберите категорию</h5>
    <li
      class="list-group-item list-group-item-action cursor-pointer"
      :class="{'active' : category.id === categoryID}"
      v-for="category of categories"
      :key="category.id"
      @click="choiseCategory(category.id)"
    >
      {{ category.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "choiseCategories",

  data: () => ({
    categoryID: "",
    categories: [
      { id: "001", title: "Транспорт", name: "vihicle" },
      { id: "002", title: "Недвижимость", name: "estate" },
      { id: "003", title: "Услуги", name: "services" },
      { id: "004", title: "Личные вещи", name: "personal_thinks" },
      { id: "005", title: "Хобби и отдых", name: "hobby" },
      { id: "006", title: "Бытовая электроника", name: "electronics" },
      { id: "007", title: "Для дома и дачи", name: "for_home" },
    ],
  }),

  methods: {
      choiseCategory(id){
          this.categoryID = id;
          this.$emit('choise-category', id)
      }
  }
};
</script>

<style lang="scss" scoped>
</style>