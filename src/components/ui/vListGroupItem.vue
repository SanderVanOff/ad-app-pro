<template>
  <div class="list-group-item">
    <div class="d-flex w-100">
      <div class="list-group-item__img me-3">
        <router-link :to="{ name: 'ProductItem', params: { id: card.id } }">
          <img
            :src="card.mainImage"
            class="img-fluid rounded img-cover"
            style="width: 200px; height: 180px"
          />
        </router-link>
      </div>
      <div class="list-group-item__text">
        <router-link
          class="text-decoration-none link-dark"
          :to="{ name: 'ProductItem', params: { id: card.id } }"
        >
          <h5 class="mb-1">{{ card.title }}</h5>
        </router-link>
        <p class="mb-1">
          <span class="fw-bold me-2">Статус:</span>
          <span
            class="badge bg-success"
            :class="getStatus(card.status).class"
            >{{ getStatus(card.status).text }}</span
          >
        </p>
        <div class="badge bg-dark fs-5">{{ getCurrency(card.cost) }}</div>
      </div>
      <div class="list-group-item__info ms-auto d-flex flex-column">
        <div class="card-body__views mb-2 ms-auto">
          <i class="fas fa-calendar-alt me-2"></i>
          <span>{{ getDateAd(card.createDate) }}</span>
        </div>
        <!--  -->

        <div class="card-body__views mb-2 ms-auto">
          <i class="fas fa-eye me-2"></i>
          <span>{{ card.views ? card.views.length : 0 }}</span>
        </div>
        <!--  -->

        <div class="card-body__views mb-3 ms-auto">
          <i class="fas fa-heart me-2"></i>
          <span>{{ card.likes ? card.likes.length : 0 }}</span>
        </div>
        <div class="buttons-group d-flex justify-contetn-between">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//mixins
import statusMixin from "@/mixins/status.mixin";
//filters
import { formatCurrency } from "@/filters/currency.filter";
import dateFilter from "@/filters/date.filter.js";
export default {
  name: "ListGroupItem",
  props: {
    card: {
      type: Object,
    },
  },
  mixins: [statusMixin],
  methods: {
    getCurrency(value) {
      return formatCurrency(value);
    },
    getDateAd(value) {
      return dateFilter(value);
    },
  },
};
</script>

<style>
</style>