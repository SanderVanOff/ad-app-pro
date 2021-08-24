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
        <v-params v-if="counter === 2" 
        @done-params="doneParams"
        @get-params="getParams"></v-params>
        <!--03 photos step -->
        <v-photos
          v-if="counter === 3"
          @done="withoutPhotos"
          @get-photos="getPhotos"
        ></v-photos>
        <!--04 contact step -->
        <v-contact v-if="counter === 4" 
        @done-params="doneParams"
        @get-contact="getContact"></v-contact>
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
          v-if="counter !== 4"
        >
          Далее
          <i class="fas fa-forward ms-2"></i>
        </button>

        <button
          type="button"
          class="btn btn-success fs-5"
          :disabled="!done"
          @click="publicateAd"
          v-else
        >
          Опубликовать
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
import vPhotos from "@/components/createAd/v-photos.vue";
import vContact from "@/components/createAd/v-contact.vue";

//mixins
import edidAdMixin from '@/mixins/editAd.mixin.js'
//vuex
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "CreateAd",
  mixins: [edidAdMixin],
  components: {
    vMainSection,
    vChoiseCategories,
    vParams,
    vPhotos,
    vContact,
  },

  data: () => ({
    counter: 1,
    loading: false,
    done: false,
    formValues: {
      id: Date.now().toString(32),
      user: '',
      categoryId: "",
      
    },
  }),

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    ...mapActions(['publicNewAd', 'getCurrentUser']),

    nextStep() {
      this.counter++;
      this.done = false;
      if(this.counter === 3) {
        this.done = true;
      }
    },

    prevStep() {
      this.counter--;
      this.done = true;
    },
    getCategory(id) {
      this.formValues.categoryId = id;
      this.done = true;
    },


    async publicateAd() {
      this.loading = true;
      try {
        await this.publicNewAd(this.formValues);
        this.loading = false;
        this.$router.push('/')
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
  },

  async mounted(){
    await this.getCurrentUser()
    this.formValues.user = this.currentUser
  }
};
</script>

<style lang="scss" scoped>
</style>