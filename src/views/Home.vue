<template>
  <v-main-section>
    <!-- Loading -->
    <Loader v-if="loading" />

    <!-- ads -->
    <div class="home" v-else>
      <app-categories
        @changeCategory="changeCategory"
        :categories="categories"
      ></app-categories>
      <keep-alive>
        
          <template v-if="filteredByCategoryAds.length">
          <transition-group name="list" mode="out-in" tag="div" class="cards">
            <v-card
              v-for="card of filteredByCategoryAds"
              :key="card.id"
              :cardItem="card"
              @go-to-card-info="goToCardInfo(card.id)"
              @favorite-ad="likesAd(card.id)"
            ></v-card>
            </transition-group>
          </template>
          <!-- empty -->
          <v-no-ad v-else />
        
      </keep-alive>
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
  props: ["id"],
  components: {
    vMainSection,
    vCard,
    vNoAd,
    appCategories,
  },
  computed: {
    ...mapGetters(["allAds", "currentUID"]),

    filteredByCategoryAds(){
      return this.ads.filter(item => {
        if(this.filter === '000'){
          return true
        } else {
          return item.categoryId === this.filter
        }
      })
    }
  },
  data: () => ({
    loading: false,
    counter: 0,
    ads: [],
    filter: '000',
    categories: [],
  }),


  methods: {
    ...mapActions(["fetchAdsFromDB", "addFavoriteAdToUser", "fetchCategories"]),
    async goToCardInfo(id) {
      this.$router.push({
        name: "ProductItem",
        params: { id: id },
      });
    },
    async likesAd(id) {
      await this.addFavoriteAdToUser(id);
    },

    changeCategory(payload) {
      this.filter = payload
    },
  },
  async mounted() {
    this.loading = true;
    this.categories = [
      { id: "000", title: "Все", name: "all" },
      ...(await this.fetchCategories()),
    ];
    this.ads = await this.fetchAdsFromDB();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
}

@media (max-width: 1440px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
}

@media (max-width: 1216px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
}

@media (max-width: 991px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    padding: 0 1rem;
  }
}

@media (max-width: 576px) {
  .cards {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    justify-content: center;
  }
}
</style>