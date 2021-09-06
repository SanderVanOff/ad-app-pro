<template>
  <v-main-section title="Мои объявления" icon="fas fa-child">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- empty -->

    <v-no-ad v-else-if="!loading && usersAds.length === 0" />

    <!-- own -->
    <div class="list-group">
      <transition-group name="list">
        <v-list-group-item v-for="card of usersAds" :key="card.id" :card="card">
          <router-link
            tag="button"
            class="
              btn btn-secondary
              mb-2 mb-md-0
              me-md-3
              d-flex
              align-items-center
              justify-content-center
            "
            :to="{ name: 'EditAd', params: { id: card.id } }"
          >
            <i class="fas fa-edit me-2"></i>
            <span>Редактировать</span></router-link
          >
          <button
            class="btn d-flex align-items-center justify-content-center"
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

            <span>{{
              card.status === "closed" ? "Разместить" : "Закрыть"
            }}</span>
          </button>
        </v-list-group-item>
      </transition-group>
    </div>
    <!--  -->
    <v-modal modalId="removeOwn">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="reasonClosed = null"
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

          <FormulateInput
          v-if="currentAd && currentAd.status !== 'closed'"
            v-model="reasonChangeAd"
            :options="reasonsForClosed"
            type="select"
            placeholder="Укажите причину закрытия объявления"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="reasonChangeAd = null"
          >
            Нет
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            :disabled="currentAd && currentAd.status !== 'closed' && !reasonChangeAd"
            @click="changeStatusAd(currentAd.id)"
          >
            Да, уверен
          </button>
        </div>
      </div>
    </v-modal>
    <!--  -->
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
    reasonChangeAd: null,
    reasonsForClosed: [
      {value: 'soldHere', label: 'Продал здесь'},
      {value: 'soldSomewhere', label: 'Продал где-то еще'},
      {value: 'otherReason', label: 'Другая причина'}
    ],
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
      let reason = this.currentAd.status !== 'closed'
      ? this.reasonChangeAd
      : 'recovery'
        await this.changeStatusAdById({id, reasonChangeAd: reason});

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