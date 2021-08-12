<template>
  <v-main-section title="Сообщения" icon="fas fa-envelope">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- messages -->
    <div class="card px-0 overflow-hidden col-12" v-else>
      <div class="card-header">
        <div class="list-group-item__text">
          <div class="list-group-item__seller d-flex align-items-center mb-2">
            <img
              :src="userAd.avatar"
              class="me-3 rounded-circle user-avatar"
              alt="..."
            />
            <h5 class="card-title">{{ userAd.login }}</h5>
          </div>
          <h6 class="mb-1">
            <i class="fas fa-shopping-bag fs-4 me-3"></i>
            <span>{{ currentAd.title }}</span>
          </h6>
        </div>
      </div>
      <!-- card-header -->
      <div class="card-body overflow-auto vh-50 d-flex flex-column">
        <p
          v-for="mess of messages"
          :key="mess.id"
          class="message text-wrap text-start fs-6 fw-normal badge"
          :class="
            mess.type === 'seller'
              ? 'message-seller me-3 bg-gray-light  text-dark'
              : 'message-customer ms-3 bg-message text-dark'
          "
          v-html="mess.text"
        ></p>
      </div>
      <div class="card-footer text-muted">
        <div class="input-group">
          <button
            class="btn btn-outline-secondary button-form"
            type="button"
            id="button-addon1"
          >
            <i class="fas fa-plus-square"></i>
          </button>
          <div
            type="text"
            class="form-control"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            @input="(e) => getMessage(e)"
            ref="messageField"
            contenteditable
          ></div>
          <button
            class="btn btn-info text-light button-form"
            type="button"
            id="button-addon1"
            @click="sendMessage"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </v-main-section>
</template>

<script>
//comoponent
import vMainSection from "@/components/ui/vMainSection.vue";
//vuex
import { mapActions, mapGetters } from "vuex";

export default {
  name: "message-item",
  props: ["id", "currentUserID"],
  components: { vMainSection },

  data: () => ({
    loading: true,
    userAd: null,
    currentAd: null,
    currentChat: {},
    message: {
      text: "",
    },
    messages: [],
  }),
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    ...mapActions([
      "getAdById",
      "getUserById",
      "fetchChatByData",
      "createNewChat",
      "getCurrentUser",
    ]),

    async createChat() {
      const newChat = {
        id: `chat-${(Date.now() + Math.floor(Math.random(1000))).toString(32)}`,
        seller: this.userAd,
        customer: this.currentUser,
        messages: [],
        adID: this.currentAd.id,
        dateOfCreating: new Date(),
      };
      this.currentChat = await this.createNewChat(newChat);
    },

    sendMessage() {
      const newMessage = {
        id: `mess-${(Date.now() + Math.floor(Math.random(1000))).toString(32)}`,
        type: "customer",
        ownerID: "HGvS8THVbudf2tLZF9qQ9ItWMf82",
        text: this.message.text,
        dateOfCreation: new Date(),
      };

      this.messages.push(newMessage);
      this.message.text = "";
      this.$refs.messageField.innerHTML = "";
    },

    getMessage(e) {
      this.message.text = e.target.innerHTML;
    },
  },

  async mounted() {
    this.loading = true;
    const currentUser = await this.getCurrentUser();
    this.currentChat = await this.fetchChatByData({
      adID: this.$route.params.id,
      currentUserID: currentUser.id,
    });
    
    this.currentAd = await this.getAdById(this.$route.params.id);
    this.userAd = await this.getUserById(this.currentAd.uid);
    if (!this.currentChat) await this.createChat();
    this.messages = this.currentChat.messages;
    this.loading = false;
  },
};
</script>

<style scoped>
.user-avatar {
  object-fit: cover;
  width: 40px;
  height: 40px;
}
.button-form {
  width: 40px;
  height: 40px;
  margin-top: auto;
}

.message-customer {
  padding: 12px;
  align-self: flex-end;
}
</style>