<template>
  <div class="login">
    <v-auth-component>
      <h4 class="mb-4 pb-2 border-bottom">Аутентификация</h4>
      <div class="form w-100" @keypress.enter="submitForm">
        <FormulateInput
          type="email"
          name="email"
          label="Email"
          placeholder="Введите email"
          validation="required|email"
          :element-class="['input-element']"
          v-model="formValues.email"
          ref="email"
          @validation="validationEmail = $event"
        />
        <div
          class="form-text valid-input"
          v-if="!this.validationEmail.hasErrors"
        >
          Email корректен
        </div>

        <!-- Password -->

        <FormulateInput
          type="password"
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          validation="required|min:6,length"
          :element-class="['input-element']"
          v-model="formValues.password"
          ref="password"
          @validation="validationPass = $event"
        />
        <div
          class="form-text valid-input"
          v-if="!this.validationPass.hasErrors"
        >
          Супер, пароль годится!
        </div>

        <!-- Submit -->
        <FormulateInput
          type="submit"
          @click.prevent="submitForm"
          :disabled="loading || !isValidForm"
          >Войти<i class="fas fa-sign-in-alt ms-2"></i
          ><span class="loader" v-if="loading" />
        </FormulateInput>
        <!-- Забыл и регистрация -->

        <div class="form__bottom d-flex justify-content-between mt-4 mb-4">
          <router-link :to="{ name: 'Signup' }" class="link-dark small"
            >Зарегистрироваться</router-link
          >
          <router-link :to="{ name: 'Forget' }" class="link-dark small"
            >Забыл пароль</router-link
          >
        </div>
      </div>
    </v-auth-component>
  </div>
</template>

<script>
import { mapActions } from "vuex";
//components
import vAuthComponent from "@/components/ui/vAuthComponent.vue";
export default {
  components: { vAuthComponent },
  data: () => ({
    formValues: {
      email: "",
      password: "",
    },
    validationEmail: {},
    validationPass: {},
    loading: false,
  }),
  computed: {
    isValidForm() {
      return !this.validationEmail.hasErrors && !this.validationPass.hasErrors;
    },
  },
  methods: {
    ...mapActions(["loginUser"]),
    async submitForm() {
      try {
        await this.loginUser(this.formValues);
        this.$router.push({
          name: "Home",
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>