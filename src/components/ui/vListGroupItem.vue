<template>
  <div class="list-group-item">
    <div class="list-group-item__body d-flex w-100">
      <div class="list-group-item__img me-sm-3 mb-sm-0 mb-3">
        <router-link :to="{ name: 'ProductItem', params: { id: card.id } }">
          <img
            :src="card.mainImage"
            class="list-group-item__main-image img-fluid rounded img-cover"
            :style="card.status === 'closed' ? 'filter: opacity(0.5)': 'filter: none'"
          />
        </router-link>
      </div>
      <div class="list-group-item__text"
      :style="card.status === 'closed' ? 'filter: opacity(0.5)': 'filter: none'"
      >
        <router-link
          class="text-decoration-none link-dark"
          :to="{ name: 'ProductItem', params: { id: card.id } }"
        >
          <h5 class="mb-sm-1 mb-3">{{ card.title }}</h5>
        </router-link>
        <p class="mb-sm-1 mb-3">
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
        <div class="card-body__views mb-2 ms-sm-auto ms-0">
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
        <div
          class="
            buttons-group buttons-group__action
            d-flex
            justify-contetn-between
          "
        >
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

<style lang="scss" scoped>

.list-group-item:last-child {
margin-bottom: 3.5rem;
}

.list-group-item__main-image {
  width: 200px;
  height: 200px;
  max-width: 200px;
}

@media (max-width: 767px) {
  .list-group-item__main-image {
    height: 150px;
    max-width: 150px;
  }

  .buttons-group__action {
    flex-direction: column;
  }
}

@media (max-width: 575px) {
  .list-group-item__body {
    flex-wrap: wrap;
  }

  .list-group-item__main-image {
    width: 350px;
    height: 250px;
    max-width: 100%;
}

  .list-group-item__text {
    display: flex;
    flex: 100%;
    flex-direction: column;
    margin-bottom: 1rem;

    & a {
      flex: 100%;
    }
  }

  .list-group-item__info {
    flex: 100%;
    flex-direction: row !important;
    flex-wrap: wrap;

    & .buttons-group__action {
      flex: 100%;
    }
  }
}
</style>