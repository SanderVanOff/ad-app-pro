<template>
  <div class="card">
    <div class="card-img position-relative">
    <!--
      <img
        :src="cardItem.mainImage"
        class="card-img-top card-image img-cover cursor-pointer"
        @click="$emit('go-to-card-info')"
      />
      -->
      <div :id="`carouselExampleIndicators${cardItem.id}`" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
  <div class="carousel-indicators">
    <button 
    v-for="(img, i) of cardItem.images"
    :key="img"
    type="button" :data-bs-target="`#carouselExampleIndicators${cardItem.id}`" :data-bs-slide-to="i" 
    :class="{ active: currentImg === i }"
     aria-current="true" aria-label="Slide 1"></button>
  </div>
  <div class="carousel-inner"
  @click="$emit('go-to-card-info')">
    <div class="carousel-item"
    v-for="(img, i) of cardItem.images"
      :key="img"
      :class="{ active: currentImg === i }"
    >
      <img 
      :src="img" class="d-block w-100 card-img-top card-image img-cover cursor-pointer" alt="...">
    </div>
  </div>
</div>
      <div
        class="card-info d-flex justify-content-between ps-3 align-items-center position-absolute top-1"
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
    currentImage: 0
  }),

  computed: {
    ...mapGetters(["currentUser"]),
    isFavorite() {
      return this.cardItem.likes.includes(this.currentUser.id) ? true : false;
    },
    currentImg(){
      return this.cardItem.images.findIndex((item)=> item === this.cardItem.mainImage)
    }
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