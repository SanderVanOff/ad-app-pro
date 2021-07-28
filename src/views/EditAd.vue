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
      <v-params :ad="currentAd"></v-params>

      <!--04 contact step -->
      <v-contact :ad="currentAd"></v-contact>
    </div>
  </v-main-section>
</template>

<script>
//components
import vMainSection from "@/components/ui/vMainSection.vue";
import vParams from "@/components/createAd/v-params.vue";
// import vPhotos from "@/components/createAd/v-photos.vue";
import vContact from "@/components/createAd/v-contact.vue";

//vuex
import { mapActions } from "vuex";

export default {
  name: "EditAd",
  props: {
    id: {
      type: String,
    },
  },
  data: () => ({
    loading: false,
    categoryAd: "",
    currentAd: "",
  }),
  components: {
    vMainSection,
    vParams,
    vContact,
  },

  methods: {
    ...mapActions(["fetchCategories", "getAdById"]),
  },

  async mounted() {
    this.loading = true;
    this.currentAd = await this.getAdById(this.id);
    this.categoryAd = (await this.fetchCategories()).find(
      (item) => item.id === this.currentAd.categoryId
    );
    this.loading = false;
  },
};
</script>

<style>
</style>