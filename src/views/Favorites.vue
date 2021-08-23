<template>
  <v-main-section title="Избранное" icon="fas fa-heart">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->
    <v-no-ad
      v-else-if="!loading && favoriteAds.length === 0"
      :text="'Добавим?'"
      :btnText="'Перейти к объявлениям'"
      :btnLink="'Home'"
    />
    <!-- favorites -->
    <div class="list-group" v-else>
    <transition-group name="list">
      <v-list-group-item
        v-for="card of favoriteAds"
        :key="card.id"
        :card="card"
      >
        <button
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#removeFavorite"
          @click="currentAdId = card.id"
        >
          <span>Удалить</span>
          <i class="fas fa-trash-alt ms-2"></i>
        </button>
      </v-list-group-item>
      </transition-group>
      <v-modal modalId="removeFavorite">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Уверены, что хотите удалить объявление из избранного?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Нет
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="removeFavorite"
                >
                  Да, уверен
                </button>
              </div>
            </div>
          </v-modal>
    </div>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vListGroupItem from "@/components/ui/vListGroupItem.vue";
import vNoAd from "@/components/ui/vNoAd.vue";
import vModal from '@/components/ui/vModal.vue'

//vuex
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Favorites",
  components: {
    vMainSection,
    vListGroupItem,
    vNoAd,
    vModal
  },
  data: () => ({
    loading: true,
    currentAdId: ''
  }),
  computed: {
    ...mapGetters(["allAds", "currentUID"]),

    favoriteAds() {
      return this.allAds.filter((ad) =>
        ad.likes ? ad.likes.includes(this.currentUID) : ""
      );
    },
  },
  methods: {
    ...mapActions(["fetchAdsFromDB", "addFavoriteAdToUser"]),
    async removeFavorite() {
      await this.addFavoriteAdToUser(this.currentAdId);
    },
  },

  async mounted() {
    await this.fetchAdsFromDB();
    this.loading = false;
  },
};
</script>

<style>
</style>