<template>
  <v-main-section title="Сообщения" icon="fas fa-envelope">
  <!-- Loading -->
    <Loader v-if="loading" />
    <!--No messages -->
    <v-no-messages 
    v-else-if="!loading && messagesList.length === 0"
    title="Сообщений пока нет"
    text=""
    btnText="на главную"
    btnLink="Home"
    ></v-no-messages>
    <!-- Messages list -->
    <div class="list-group" v-else>
      <!--  -->
      <router-link :to="{ name: 'MessageItem', params: { id: item.adID }}" 
      class="list-group-item list-group-item-action" 
      v-for="item of messagesList" :key="item.id">
        <div class="d-flex w-100">
          <div class="list-group-item__img me-3">
            <img
              :src="item.adMainImage"
              class="img-fluid rounded"
              alt="..."
              style="width: 100px"
            />
          </div>
          <div class="list-group-item__text">
            <div class="list-group-item__seller d-flex align-items-center mb-2">
              <img
                :src="item.seller.avatar"
                class="me-3 rounded-circle"
                alt="..."
                style="width: 30px; height: 30px"
              />
              <h5 class="card-title">{{item.seller.login}}</h5>
            </div>
            <h6 class="mb-1">
              {{item.adTitle}}
            </h6>
            <p
              class="list-group-item__message text-truncate text-muted"
              style="width: 50vw"
              v-if="item.messages.length"
              v-html="item.messages[item.messages.length - 1].text"
            >
            </p>
          </div>
          <div class="list-group-item__info ms-auto d-flex flex-column">
            <div class="card-body__views mb-2 ms-auto" v-if="item.messages.length">
              <i class="fas fa-check-double me-2 "
              :class="item.messages[item.messages.length - 1].status === 'sent' ? 'text-secondary': 'text-success'"
              ></i>
              <span>{{getDateLastMessage(item.messages[item.messages.length - 1].dateOfCreation)}}</span>
            </div>
            <!--  -->
          </div>
        </div>
      </router-link>
      <!--  -->
    </div>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
import vNoMessages from "@/components/ui/vNoAd.vue";
//Vuex
import {mapActions, mapGetters} from 'vuex'
//filter
import dateFilter from "@/filters/date.filter.js";
export default {
  name: "MessageList",
  components: {
    vMainSection,vNoMessages
  },
  data: () => ({
    loading: true,
    messagesList: []
  }),
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['getUserChats', 'getCurrentUser']),
    getDateLastMessage(value) {
      return dateFilter(value);
    },
  },

  async mounted() {
    await this.getCurrentUser()
    this.messagesList = await this.getUserChats(this.currentUser.id)

    this.loading = false;
  }
};
</script>

<style>
</style>