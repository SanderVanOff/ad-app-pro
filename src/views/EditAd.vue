<template>
  <v-main-section title="Редактировать объявление" icon="fas fa-edit">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- Data -->

    <!-- Category -->
    <div class="form-control mb-3 w-50">
      <h4 class="title mb-3 mt-3">
        Категория:
        <small class="text-muted">{{ categoryAd.title }}</small>
      </h4>
    </div>

    <!--02 params step -->
    <div v-if="currentAd">
      <pre>{{ formValues }}</pre>
      <v-params :ad="currentAd" @get-params="getParams"></v-params>

      <!--03 contact step -->
      <v-contact :ad="currentAd" @get-contact="getContact"></v-contact>

      <!--04 photos step -->
      <v-photos :ad="currentAd" @get-photos="getPhotos"></v-photos>
    </div>
  </v-main-section>
</template>

<script>
//components
import vMainSection from "@/components/ui/vMainSection.vue";
import vParams from "@/components/createAd/v-params.vue";
import vPhotos from "@/components/createAd/v-photos.vue";
import vContact from "@/components/createAd/v-contact.vue";

//mixins
import edidAdMixin from "@/mixins/editAd.mixin.js";
//vuex
import { mapActions } from "vuex";

export default {
  name: "EditAd",
  mixins: [edidAdMixin],
  props: {
    id: {
      type: String,
    },
  },
  data: () => ({
    loading: false,
    categoryAd: "",
    currentAd: "",
    formValues: {
      images: [],
    },
  }),
  components: {
    vMainSection,
    vParams,
    vContact,
    vPhotos,
  },

  methods: {
    ...mapActions(["fetchCategories", "getAdById"]),
  },

  async mounted() {
    this.loading = true;
    this.currentAd = await this.getAdById(this.id);
    this.formValues.images = this.currentAd.images;
    this.categoryAd = (await this.fetchCategories()).find(
      (item) => item.id === this.currentAd.categoryId
    );
    this.loading = false;
  },
};
</script>

<style>
</style>