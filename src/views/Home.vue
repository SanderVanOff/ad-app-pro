<template>
  <v-main-section>
  <app-categories 
    @changeCategory="changeCategory"
    :categories=categories></app-categories>
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->
    <v-no-ad v-else-if="!filteredAd.length"/>

    <!-- ads -->
    <div class="home" v-else>
    

    <transition-group name="list" mode="out-in" tag="div" class="cards" >
      <v-card
        v-for="card of filteredAd"
        :key="card.id"
        :cardItem="card"
        @go-to-card-info="goToCardInfo(card.id)"
        @favorite-ad="likesAd(card.id)"
      ></v-card>
    </transition-group>
    </div>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vCard from "@/components/ui/vCard.vue";
import vNoAd from "@/components/ui/vNoAd.vue";
import appCategories from "@/components/ui/appCategories.vue";
//vuex
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    vMainSection,
    vCard,
    vNoAd,
    appCategories
  },
  computed: {
    ...mapGetters(["allAds", "currentUID"]),
    activeAds() {
      return this.ads;
      // return this.ads.filter(ad => ad.status === 'active');
    },
  },
  data: () => ({
    loading: false,
    counter: 0,
    ads: [],
    filteredAd: [],
    categories: []
  }),
  methods: {
    ...mapActions([
      "fetchAdsFromDB",
      "addFavoriteAdToUser",
      "fetchCategories"
    ]),
    async goToCardInfo(id) {
      
      this.$router.push({
        name: "ProductItem",
        params: { id: id },
      });
    },
    async likesAd(id) {
      await this.addFavoriteAdToUser(id);
    },

    changeCategory(id){
      this.filteredAd = this.ads.filter(ad => ad.categoryId === id)
    } 
  },
  async mounted() {
    this.loading = true;
    this.categories = await this.fetchCategories()
    this.ads = await this.fetchAdsFromDB();
    this.filteredAd = this.ads;
    this.loading = false;
  },
};
</script>

<style>
</style>