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
          <span v-if="currentAd.status === 'closed'" class="badge bg-danger"
            >Закрыто</span
          >
        </h3>
        <div class="product-images__list">
          <!-- <img
            :src="item"
            alt=""
            class="product-images__item rounded"
            v-for="item of currentAd.images"
            :key="item"
            data-bs-toggle="modal"
            data-bs-target="#modalImageId"
            @click="modalImage = item"
          /> -->
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                class="carousel-item h-50"
                :class="{ active: currentImage === i }"
                v-for="(item, i) of currentAd.images"
                :key="item"
              >
                <img
                  :src="item"
                  class="d-block w-100 img-contain cursor-pointer"
                  alt="..."
                  style="height: 380px; background-color: #212529"
                  data-bs-toggle="modal"
                  data-bs-target="#modalImageId"
                  @click="modalImage = item"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Предыдущий</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Следующий</span>
            </button>
          </div>
        </div>
      </div>

      <!-- info -->
      <div class="product__data position-relative">
        <div
          class="product-data__info sticky-top px-4"
          :class="currentAd.status === 'closed' ? 'text-muted' : 'text-body'"
        >
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
              btn btn-dark
              mb-2
              shadow-sm
              d-flex
              align-items-center
              justify-content-center
              p-2
              py-lg-2 py-4
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
              "
              style="margin-bottom: 5rem"
            >
              <template v-if="currentAd.status !== 'closed'">
                <button
                  type="button"
                  class="btn btn-dark mb-2 py-lg-2 py-4"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPhone"
                  :disabled="currentAd.communication === 'onlyMessage'"
                >
                  <i class="fas fa-binoculars fs-4 me-3"></i>
                  {{
                    currentAd.communication === "onlyMessage"
                      ? "Номер скрыт"
                      : "Показать номер"
                  }}
                </button>
                <router-link
                  tag="button"
                  :disabled="currentAd.uid === currentUser.id"
                  class="btn btn-dark py-lg-2 py-4"
                  :to="{ name: 'MessageItem', params: { id: currentAd.id } }"
                >
                  <i class="fas fa-feather-alt fs-4 me-3"></i>
                  Написать
                </router-link>
              </template>
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
/*
.product-images__list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, 1fr);
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
*/

.user-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.buttons-group {
  margin-bottom: 1.5rem;
}
.modal-img {
  width: 100%;
  object-fit: contain;
  height: 100vh;
}

@media (max-width: 992px) {
  .product {
    grid-template-columns: 12fr;
  }

  .buttons-group {
    margin-bottom: 5rem;
  }
}
</style>