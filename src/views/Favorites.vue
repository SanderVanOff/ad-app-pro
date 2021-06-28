<template>
  <v-main-section title="Избранное" icon="fas fa-heart">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->
    <v-no-ad v-else-if="!loading && favoriteAds.lenght === 0" />
    <!-- favorites -->
    <div class="list-group" v-else>
      <v-list-group-item
        v-for="card of favoriteAds"
        :key="card.id"
        :card="card"
      >
        <button
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#removeFavorite"
          @click="currentAd.value = ad"
        >
          <span>Удалить</span>
          <i class="fas fa-trash-alt ms-2"></i>
        </button>
      </v-list-group-item>
    </div>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vListGroupItem from "@/components/ui/vListGroupItem.vue";
import vNoAd from "@/components/ui/vNoAd.vue";

//vuex
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Favorites",
  components: {
    vMainSection,
    vListGroupItem,
    vNoAd,
  },
  data: () => ({
    loading: true,
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
    ...mapActions(["fetchAdsFromDB"]),
  },

  async mounted() {
    await this.fetchAdsFromDB();
    this.loading = false;
  },
};
</script>

<style>
</style>