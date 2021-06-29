<template>
  <v-main-section title="Создать объявление" icon="fas fa-envelope">
    <!-- progress -->
    <div class="progress mb-4">
      <div
        class="progress-bar progress-bar-striped"
        role="progressbar"
        :style="`width: ${(100 / 4) * counter}%`"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <!-- Loading -->
    <Loader v-if="loading" />
    <!--Form -->
    
    <FormulateForm class="login-form" v-model="formValues" v-else>
    <keep-alive>
      <!--01 categories step -->
      <v-choise-categories
        v-if="counter === 1"
        @choise-category="getCategory"
      ></v-choise-categories>
      <!--02 params step -->
      <v-params v-if="counter === 2"></v-params>
      <!--01 categories step -->
      <!--01 categories step -->
      <!--buttons next/prev -->
      </keep-alive>
      <div class="form-buttons mt-4">
        <button
          type="button"
          class="btn btn-dark fs-5 me-2"
          v-if="counter > 1"
          @click="prevStep"
        >
          Назад
        </button>
        <button
          type="button"
          class="btn btn-success fs-5"
          :disabled="!done"
          @click="nextStep"
        >
          Далее
          <i class="fas fa-forward ms-2"></i>
        </button>
      </div>
      
    </FormulateForm>
    
  </v-main-section>
</template>

<script>
// :class="{ 'bg-success': !v$.$invalid }"
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vChoiseCategories from "@/components/createAd/v-choiseCategories.vue";
import vParams from "@/components/createAd/v-params.vue";
export default {
  name: "CreateAd",
  components: {
    vMainSection,
    vChoiseCategories,
    vParams
  },

  data: () => ({
    counter: 1,
    loading: false,
    done: false,
    formValues: {
      categoryId: "",
    },
  }),

  methods: {
    nextStep() {
      this.counter++;
      this.done = false
    },

    prevStep() {
      this.counter--;
      this.done = true
    },
    getCategory(id) {
      this.formValues.categoryId = id;
      this.done = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>