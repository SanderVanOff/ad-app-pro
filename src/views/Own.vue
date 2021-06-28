<template>
  <v-main-section title="Мои объявления" icon="fas fa-child">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->

    <v-no-ad v-else-if="!loading && usersAds.lenght === 0" />

    <!-- own -->
    <div class="list-group">
      <v-list-group-item v-for="card of usersAds" :key="card.id" :card="card">
        <router-link
          tag="button"
          class="btn btn-secondary me-3 d-flex align-items-center"
          :to="{ name: 'EditAd', params: { id: card.id } }"
        >
          <i class="fas fa-edit me-2"></i>
          <span>Редактировать</span></router-link
        >
        <button
          class="btn d-flex align-items-center"
          :class="card.status === 'closed' ? 'btn-success' : 'btn-danger'"
          data-bs-toggle="modal"
          data-bs-target="#removeOwn"
          @click="currentAd.value = card"
        >
          <i
            class="me-2"
            :class="
              card.status === 'closed'
                ? 'fas fa-sync-alt'
                : 'far fa-times-circle'
            "
          ></i>

          <span>{{ card.status === "closed" ? "Разместить" : "Закрыть" }}</span>
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
  name: "Own",

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

    usersAds() {
      return this.allAds.filter((ad) => ad.uid === this.currentUID);
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