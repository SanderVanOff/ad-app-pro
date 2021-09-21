<template>
  <div class="card">
    <div class="card-img position-relative">
      <agile :dots="false" :initialSlide="currentImg" :navButtons="false">
        <div
          class="slide"
          v-for="img of cardItem.images"
          :key="img"
          @click="$emit('go-to-card-info')"
        >
          <img
            :src="img"
            class="
              d-block
              w-100
              card-img-top card-image
              img-cover
              cursor-pointer
            "
          />
        </div>
      </agile>
      <div
        class="
          card-info
          d-flex
          justify-content-between
          ps-3
          align-items-center
          position-absolute
          top-1
        "
      >
        <span class="badge bg-danger fs-5 shadow-lg">{{
          getCurrencyCost(cardItem.cost)
        }}</span>
      </div>
    </div>

    <div class="card-body d-flex justify-content-between align-items-center">
      <h6
        class="card-title break-word"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      >
        {{ cardItem.title }}
      </h6>
      <transition name="component-fade" mode="out-in">
        <span class="icon" @click="likeAd">
          <i
            class="fs-4 cursor-pointer fa-heart"
            :class="isFavorite ? 'fas' : 'far'"
          ></i>
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";

//filters
import { formatCurrency } from "@/filters/currency.filter";
//vuex
import { mapGetters } from "vuex";
export default {
  name: "Card",
  props: {
    cardItem: {
      type: Object,
      requered: true,
      default: () => ({}),
    },
  },
  components: {
    agile: VueAgile,
  },
  data: () => ({
    likes: [],
    currentImage: 0,
  }),

  computed: {
    ...mapGetters(["currentUser"]),
    isFavorite() {
      return this.cardItem.likes.includes(this.currentUser.id) ? true : false;
    },
    currentImg() {
      return this.cardItem.images.findIndex(
        (item) => item === this.cardItem.mainImage
      );
    },
  },

  methods: {
    getCurrencyCost(value) {
      return formatCurrency(value);
    },
    likeAd() {
      this.$emit("favorite-ad");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-image {
  height: 230px;
}

@media (max-width: 991px) {
  .card-image {
    height: 250px;
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

@media (max-width: 576px) {
  .card:last-child {
    margin-bottom: 3.5rem;
  }
}
</style>