<template>
  <v-main-section title="Профиль" icon="fas fa-user-alt">
    <!-- Loading -->
    <Loader v-if="loading" />
    <!-- Profile -->
    <div class="profile" v-else>
      <div class="card-body d-flex align-items-start">
        <img
          :src="avatar"
          class="img-thumbnail me-3 rounded-circle img-cover cursor-pointer"
          alt="..."
          style="width: 150px; height: 150px"
          @click="openInputFile"
        />
        <input
          type="file"
          ref="inputFile"
          class="d-none"
          @change="changeImage"
        />
        <div class="card-body__user-about">
          <h4 class="card-title mt-3">{{ currentUser.login }}</h4>
        </div>
      </div>

      <!-- //form -->

      <form class="col-6">
        <!-- email -->
        <div class="mb-3">
          <FormulateInput
            type="email"
            name="email"
            label="Email"
            placeholder="Введите email"
            validation="required|email"
            :element-class="['input-element']"
            v-model="email"
            ref="email"
            @validation="validationEmail = $event"
            disabled
          />
        </div>
        <!-- city -->

        <div class="mb-3">
          <FormulateInput
            type="text"
            name="city"
            label="Ваш населенный пункт"
            placeholder="укажите ваш населенный пункт"
            :element-class="['input-element']"
            v-model="city"
            ref="city"
            @validation="validationCity = $event"
            :disabled="loading"
          />
        </div>

        <!-- phone -->

        <div class="mb-3">
          <FormulateInput
            type="tel"
            name="phone"
            label="Номер телефона"
            placeholder="укажите ваш сотовый телефон"
            :element-class="['input-element']"
            v-model="phone"
            @keyup="replacePhone"
            ref="phone"
            @validation="validationPhone = $event"
            :disabled="loading"
          />
        </div>

        <!-- Submit -->
        <FormulateInput
          type="submit"
          @click.prevent="updateUserData"
          :disabled="loading"
          ><span
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
            :class="{ 'd-none': !loading }"
          ></span
          >Сохранить
        </FormulateInput>

        <!--  -->
      </form>
    </div>
  </v-main-section>
</template>

<script>
//components
import vMainSection from "@/components/ui/vMainSection.vue";
//vuex
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: {
    vMainSection,
  },
  data: () => ({
    loading: true,
    patternMobile: /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g,

    //user data
    email: "",
    city: "",
    phone: "",
    avatar: "",
    avatarFile: null,
    //validation
    validationEmail: {},
    validationCity: {},
    validationPhone: {},
  }),
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    openInputFile() {
      this.$refs.inputFile.click();
    },

    changeImage() {
      this.avatarFile = this.$refs.inputFile.files[0];
      let urlImg = URL.createObjectURL(this.$refs.inputFile.files[0]);
      this.avatar = urlImg;
      
    },

    replacePhone() {
      this.phone = this.phone.replace(this.patternMobile, "+7 ($2) $3-$4-$5");
    },

    updateUserData() {
      this.loading = true;

        this.$store.dispatch("updateUserData", {
          login: this.currentUser.login,
          email: this.currentUser.email,
          city: this.city,
          phone: this.phone,
          avatar: this.avatarFile
        });
        this.loading = false;
    },
  },

  async mounted() {
    await this.$store.dispatch('getCurrentUser')
    this.email = this.currentUser.email;
    this.avatar = this.currentUser.avatar;
    this.city = this.currentUser.city ? this.currentUser.city : "";
    this.phone = this.currentUser.phone ? this.currentUser.phone : "";
    this.loading = false;
  },
};
</script>

<style>
</style>