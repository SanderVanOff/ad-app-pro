<template>
  <v-main-section>
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->
    <v-no-ad v-else-if="!loading && allAds.lenght === 0" />

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
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    vMainSection,
    vCard,
    vNoAd,
  },
  computed: {
    // ...mapGetters(["allAds"]),
    activeAds(){
      return this.allAds
    }
  },

  data: () => ({
    allAds: '',
    loading: false,
  }),

  methods: {
    ...mapActions(["fetchAdsFromDB", "addFavoriteAdToUser"]),

    async goToCardInfo(id) {
      // await this.addingViewOnVisit(id);
      this.$router.push({
        name: "ProductItem",
        params: { id: id },
      });
    },

    async likesAd(id){
     await this.addFavoriteAdToUser(id)
    }
  },

  async mounted() {
    this.loading = true;
    this.allAds = await this.fetchAdsFromDB();
    this.loading = false;
  },
};
</script>

<style>
</style>