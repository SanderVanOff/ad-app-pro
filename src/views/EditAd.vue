<template>
  <v-main-section title="Редактировать объявление" icon="fas fa-edit">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- Data -->

    <!-- Category -->
    <div class="form-control form-control_categories mb-3">
      <h4 class="title mb-3 mt-3">
        Категория:
        <small class="text-muted">{{ categoryAd.title }}</small>
      </h4>
    </div>

    <div v-if="currentAd">
      <!--01 params step -->
      <v-params :ad="currentAd" @get-params="getParams"></v-params>

      <!--02 contact step -->
      <v-contact :ad="currentAd" @get-contact="getContact"></v-contact>

      <!--03 photos step -->
      <v-photos
        :ad="currentAd"
        @get-photos="getPhotos"
        :updated="updated"
      ></v-photos>
      <!--04 save button -->
      <div class="form-buttons mt-4">
        <button
          type="button"
          class="btn-save btn btn-success fs-5"
          :disabled="!updatedData || loading"
          @click="savePublicate"
        >
          Сохранить
        </button>
      </div>
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
    updatedData: false,
    updated: false,
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
    ...mapActions(["fetchCategories", "getAdById", "updateAd"]),
    async savePublicate() {
      this.loading = true;
      this.updated = true;
      await this.updateAd({ id: this.id, ...this.formValues });
      this.updated = false;
      this.loading = false;
    },
    changeUpdateStatus() {
      this.updatedData = true;
    },
  },

  async mounted() {
    this.loading = true;
    this.currentAd = await this.getAdById(this.id);
    this.formValues.images = this.currentAd.images;
    this.categoryAd = (await this.fetchCategories()).find(
      (item) => item.id === this.currentAd.categoryId
    );
    this.updatedData = false;
    this.loading = false;
  },

  watch: {
    formValues: {
      deep: true,
      handler: "changeUpdateStatus",
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control_categories {
  width: 50% !important;
  }

@media (max-width: 991px) {
.form-control_categories {
  width: 66% !important;
  }
  .form-buttons {
    margin-bottom: 3.5rem;
  }
}


@media (max-width: 767px) {
.form-control_categories {
  width: 100% !important;
  }
}


@media (max-width: 576px) {

}
</style>