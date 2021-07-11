<template>
  <v-main-section>
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->
    <v-no-ad v-else-if="!ads.lenght" />

    <!-- ads -->
    <transition-group name="list" tag="div" class="cards" v-else>
      <v-card
        v-for="card of activeAds"
        :key="card.id"
        :cardItem="card"
        @go-to-card-info="goToCardInfo(card.id)"
        @favorite-ad="likesAd(card.id)"
      ></v-card>
    </transition-group>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vCard from "@/components/ui/vCard.vue";
import vNoAd from "@/components/ui/vNoAd.vue";
//vuex
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    vMainSection,
    vCard,
    vNoAd,
  },
  computed: {
    ...mapGetters(["allAds", "currentUID"]),
    activeAds() {
      return this.ads.filter(ad => ad.status === 'active');
    },
  },
  data: () => ({
    loading: false,
    counter: 0,
    ads: [],
  }),
  methods: {
    ...mapActions(["fetchAdsFromDB", "addFavoriteAdToUser", "addingViewOnVisit"]),
    async goToCardInfo(id) {
      await this.addingViewOnVisit(id);
      this.$router.push({
        name: "ProductItem",
        params: { id: id },
      });
    },
    async likesAd(id) {
      await this.addFavoriteAdToUser(id);
    },
  },
  async mounted() {
    this.loading = true;
    this.ads = await this.fetchAdsFromDB();
    console.log('ads', this.ads)
    this.loading = false;
  },
};
</script>

<style>
</style>