<template>
  <div class="btn-group pb-3 d-flex" role="group" aria-label="Basic outlined example">
    <button 
    v-for="category of categories"
    :key="category.id"
    :ref="`category${category.id}`"
    @click="$emit('changeCategory', category.id), getRefs(category.id)"
    type="button" class="btn btn-outline-dark" style="font-size: 0.7rem!important;">{{category.title}}</button>
  </div>
</template>

<script>
export default {
    name: "appCategories",
    props: {
      categories: {
        type: Array,
      }
    },
    methods: {
      getRefs(id){
        let butRef = `category${id}`
        Object.keys(this.$refs).forEach(key => {
          this.$refs[key][0].classList.remove('active')
        })
        this.$refs[butRef][0].classList.add('active')
      }
    }
};
</script>

<style lang="scss" scoped>
</style>