<template>
  <div class="card">
    <div class="card-img position-relative">
      <img
        :src="cardItem.mainImage"
        class="card-img-top card-image img-cover cursor-pointer"
        @click="$emit('go-to-card-info')"
      />
      <div
        class="card-info d-flex justify-content-between ps-3 align-items-center position-absolute bottom-1"
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
  data: () => ({
    likes: [],
  }),

  computed: {
    ...mapGetters(["currentUser"]),
    isFavorite() {
      return this.cardItem.likes.includes(this.currentUser.id) ? true : false;
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
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>