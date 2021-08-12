<template>
  <v-main-section title="Сообщения" icon="fas fa-envelope">
  <!-- Loading -->
    <Loader v-if="loading" />
    <!-- Messages list -->
    <div class="list-group" v-else>
      <!--  -->
      <a href="message.html" class="list-group-item list-group-item-action" v-for="item of messagesList" :key="item.id">
        <div class="d-flex w-100">
          <div class="list-group-item__img me-3">
            <img
              src="https://avatars.mds.yandex.net/get-zen_doc/108399/pub_5c4c78bca2ce3100adc276af_5c4c7afdb204f400ac70973d/scale_1200"
              class="img-fluid rounded"
              alt="..."
              style="width: 100px"
            />
          </div>
          <div class="list-group-item__text">
            <div class="list-group-item__seller d-flex align-items-center mb-2">
              <img
                src="https://rockisfest.ru/upload/iblock/d7b/d7bc07350f17ce3f973ea65206739320.jpg"
                class="me-3 rounded-circle"
                alt="..."
                style="width: 30px"
              />
              <h5 class="card-title">Продавец</h5>
            </div>
            <h6 class="mb-1">
              Совершенно новая консоль PS5 Sony PlayStation 5
            </h6>
            <p
              class="list-group-item__message text-truncate text-muted"
              style="width: 50vw"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              id asperiores repellat pariatur temporibus ab quidem non
              cupiditate repellendus. Voluptates, optio! Fuga, assumenda tempore
              nisi excepturi esse inventore dicta similique?Explicabo eveniet
              dolor at animi facere debitis deleniti inventore unde provident.
              Explicabo, exercitationem doloribus? Quia, tenetur magni sed
              perferendis vero impedit totam eligendi sit excepturi voluptate,
              ex temporibus incidunt accusantium.
            </p>
          </div>
          <div class="list-group-item__info ms-auto d-flex flex-column">
            <div class="card-body__views mb-2 ms-auto">
              <i class="fas fa-check-double me-2 text-success"></i>
              <span>15.07.2011</span>
            </div>
            <!--  -->
          </div>
        </div>
      </a>
      <!--  -->
    </div>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
//Vuex
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "MessageList",
  components: {
    vMainSection,
  },
  data: () => ({
    loading: true,
    messagesList: []
  }),
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['getUserChats', 'getCurrentUser'])
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