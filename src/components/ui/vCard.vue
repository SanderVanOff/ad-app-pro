<template>
  <div class="card">
    <div class="card-img position-relative">
    <pre>{{cardItem}}</pre>
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
        <span class="icon" @click="$emit('favorite-ad')"
          ><i v-if="isFavorite" class="fas fa-heart fs-4 cursor-pointer"> </i>
          <i class="far fa-heart fs-4 cursor-pointer" v-else></i>
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
//filters
import { formatCurrency } from "@/filters/currency.filter";
//vuex
import {mapGetters} from 'vuex';
export default {
  name: "cardItem",
  props: {
    cardItem: {
      type: Object,
      requered: true,
      default: () => ({}),
    },
  },
  data: () => ({
    
  }),

  computed: {
    ...mapGetters(['currentUID', 'allAds']),
    isFavorite() {
     let isTrue;
      if (this.cardItem.likes) {
        isTrue = this.cardItem.likes.includes(this.currentUID);
      }
      return isTrue;
    },
  },


  methods: {
    getCurrencyCost(value) {
      return formatCurrency(value);
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