<template>
  <div>
    <!-- Loading -->
    <Loader v-if="loading" />

    <!-- Product -->

    <div class="product" v-else>
      <!-- image -->
      <div class="product__images p-3">
        <h3 class="card-title h2 fw-bolder break-word mb-3 pe-4">
          {{ currentAd.title }}
        </h3>
        <div class="product-images__list">
          <img
            :src="item"
            alt=""
            class="product-images__item rounded"
            v-for="item of currentAd.images"
            :key="item"
            data-bs-toggle="modal"
            data-bs-target="#modalImageId"
            @click="modalImage = item"
          />
        </div>
      </div>

      <!-- info -->
      <div class="product__data position-relative">
        <div class="product-data__info sticky-top pt-5 px-4">
          <!--стоимость -->
          <div class="fs-2 p-2">
            <i class="fas fa-coins me-3"></i>
            {{ getCostInCurrency(currentAd.cost) }}
          </div>
          <hr />
          <!--Состояние -->
          <p class="card-text">
            <span class="fw-bold me-1 px-2">Состояние:</span>
            {{ isCondition }}
          </p>
          <!--Город -->
          <p class="card-text">
            <span class="fw-bold me-1 px-2">Город:</span>
            {{ currentAd.city }}
          </p>
          <!--Доставка -->
          <p class="card-text px-2">
            <span class="fw-bold me-1">Доставка:</span>
            {{ isDelivery }}
          </p>
          <hr />
          <!--Описание -->
          <div
            class="text-start mt-4 px-2"
            v-html="currentAd.description.replaceAll('\n', '<br/>')"
          ></div>

          <hr />
          <!--Дата добавления -->
          <div class="card-body__views mb-2">
            <i class="fas fa-calendar-alt me-2"></i>
            <span class="me-2">Добавлено:</span>
            <span class="me-2">{{ getDateAd(currentAd.createDate) }}</span>
          </div>

          <!--Кол-во просмотров -->

          <div class="card-body__views mb-2">
            <i class="fas fa-eye me-2"></i>
            <span class="me-2">Просмотров:</span>
            <span class="me-2">{{
              currentAd.views ? currentAd.views.length : 0
            }}</span>
          </div>

          <!--Избранное -->
          <div class="card-body__views mb-3">
            <i class="fas fa-heart me-2"></i>
            <span class="me-2">В избранном:</span>
            <span class="me-2">{{
              currentAd.likes ? currentAd.likes.length : 0
            }}</span>
          </div>

          <!--Кнопки -->
          <button
            type="button"
            class="
            w-100
              btn btn-secondary
              mb-2
              shadow-sm
              d-flex
              align-items-center
              justify-content-center
              p-2
            "
            @click="addLikes(currentAd.id)"
          >
            <i class="far fa-heart fs-4 me-3"></i>
            <span>{{ textFavoriteButton }}</span>
          </button>

          <hr />
          <div class="user-ad">
            <div class="d-flex align-items-center mb-3">
              <img
                :src="userAd.avatar"
                class="me-3 rounded-circle user-avatar"
                alt="..."
              />
              <div>
                <small class="text-muted">Пользователь:</small>
                <h5 class="h4">{{ userAd.login }}</h5>
              </div>
            </div>

            <div
              class="
                buttons-group
                d-flex
                flex-column
                justify-content-evenly
                mb-4
              "
            >
              <button
                type="button"
                class="btn btn-dark mb-2"
                data-bs-toggle="modal"
                data-bs-target="#modalPhone"
                :disabled="currentAd.communication === 'OnlyMessage'"
              >
                <i class="fas fa-binoculars fs-4 me-3"></i>
                {{
                  currentAd.communication === "OnlyMessage"
                    ? "Номер скрыт"
                    : "Показать номер"
                }}
              </button>
              <router-link tag="button" class="btn btn-dark" :to="{ name: 'MessageItem', params: { id: currentAd.id } }">
                <i class="fas fa-feather-alt fs-4 me-3"></i>
                Написать
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modals images -->
    <v-modal modalId="modalImageId" classModal="modal__image">
      <img :src="modalImage" alt="" class="modal-img" />
    </v-modal>
    <!-- modals phone -->
    <v-modal modalId="modalPhone">
      <div class="card">
        <div class="card-body h2 text-center">
          {{ currentAd.phone }}
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
//comoponent
// import vMainSection from "@/components/ui/vMainSection.vue";
import vModal from "@/components/ui/vModal.vue";
//vuex
import { mapActions, mapGetters } from "vuex";
//filters
import { formatCurrency } from "@/filters/currency.filter";
import dateFilter from "@/filters/date.filter.js";

export default {
  name: "ProductItem",
  props: ["id"],
  components: { vModal },
  data: () => ({
    loading: true,
    currentImage: 0,
    modalImage: null,
    currentAd: "",
    userAd: null,
    description: "",
  }),
  computed: {
    ...mapGetters(["currentUser"]),
    isCondition() {
      return this.currentAd.condition === "new" ? "Новое" : "б/у";
    },
    isDelivery() {
      return this.currentAd.delivery ? "Да" : "Нет";
    },

    textFavoriteButton() {
      let text = null;
      if (this.currentAd.likes) {
        text = this.currentAd.likes.includes(this.currentUser.id)
          ? "Убрать из избранного"
          : "Добавить в избранное";
      } else {
        text = "Добавить в избранное";
      }
      return text;
    },
  },
  methods: {
    ...mapActions([
      "getAdById",
      "getUserById",
      "addFavoriteAdToUser",
      "addingViewOnVisit",
    ]),
    getCostInCurrency(value) {
      return formatCurrency(value);
    },
    getDateAd(value) {
      return dateFilter(value);
    },
    getFormatOfDescription(e) {
      console.log(e);
    },
    addLikes(id) {
      this.addFavoriteAdToUser(id);

      if ("likes" in this.currentAd) {
        this.currentAd.likes.includes(this.currentUser.id)
          ? (this.currentAd.likes = this.currentAd.likes.filter(
              (item) => item !== this.currentUser.id
            ))
          : this.currentAd.likes.push(this.currentUser.id);
      } else {
        this.currentAd.likes = [];
        this.currentAd.likes.push(this.currentUser.id);
      }
    },
  },
  async mounted() {
    await this.addingViewOnVisit(this.id);
    this.currentAd = await this.getAdById(this.id);
    this.userAd = await this.getUserById(this.currentAd.uid);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 8fr 4fr;
  height: 100%;
  overflow: hidden;
}
.product-images__list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) 250px);
  grid-auto-flow: dense;
}
.product-images__item {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
}

.product-images__item:nth-of-type(2n) {
  grid-column: span 2;
  grid-row: span 2;
}

.product-images__item:nth-of-type(4n) {
  grid-row: span 3;
  grid-column: span 3;
}

.user-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.modal-img {
  width: 100%;
  object-fit: contain;
  height: 100vh;
}
</style>