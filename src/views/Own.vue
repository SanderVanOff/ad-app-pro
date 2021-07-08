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
          @click="currentAd = card"
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
    <v-modal modalId="removeOwn">
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
          <p>
            Уверены, что хотите
            {{
              currentAd && currentAd.status === "closed"
                ? "вновь разместить"
                : "закрыть"
            }}
            объявление?
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Нет
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="changeStatusAd(currentAd.id)"
          >
            Да, уверен
          </button>
        </div>
      </div>
    </v-modal>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vListGroupItem from "@/components/ui/vListGroupItem.vue";
import vNoAd from "@/components/ui/vNoAd.vue";
import vModal from "@/components/ui/vModal.vue";

//vuex
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Own",

  components: {
    vMainSection,
    vListGroupItem,
    vNoAd,
    vModal,
  },
  data: () => ({
    loading: true,
    currentAd: null,
  }),

  computed: {
    ...mapGetters(["allAds", "currentUID"]),

    usersAds() {
      return this.allAds.filter((ad) => ad.uid === this.currentUID);
    },
  },

  methods: {
    ...mapActions(["fetchAdsFromDB", "changeStatusAdById"]),
    async changeStatusAd(id) {
      try {
        await this.changeStatusAdById(id);
      } catch (e) {
        console.log(e);
      }
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