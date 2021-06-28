<template>
  <div class="signup">
    <v-auth-component>
      <h4 class="mb-4 pb-2 border-bottom">Регистрация</h4>
      <div class="form w-100" @keypress.enter="submitForm">
        <!-- email -->
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
        <!-- login -->
        <FormulateInput
          type="text"
          name="login"
          label="Логин"
          placeholder="Введите логин"
          validation="required"
          :element-class="['input-element']"
          v-model="formValues.login"
          ref="email"
          @validation="validationLogin = $event"
        />
        <div
          class="form-text valid-input"
          v-if="!this.validationLogin.hasErrors"
        >
          Ура, логин подходит
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
          >Зарегистрироваться<i class="fas fa-sign-in-alt ms-2"></i
          ><span class="loader" v-if="loading" />
        </FormulateInput>
        <!-- аутентификация -->

        <div class="form__bottom d-flex justify-content-between mt-4 mb-4">
          <router-link :to="{ name: 'Login' }" class="link-dark small"
            >Уже есть учетная запись</router-link
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
      login: "",
      password: "",
      avatar:
        "https://files.apisful.com/VobOMwX/a8966dae5cb230bf43c1209369480925/user-logo.png",
    },
    validationEmail: {},
    validationPass: {},
    validationLogin: {},
    loading: false,
  }),
  computed: {
    isValidForm() {
      return (
        !this.validationEmail.hasErrors &&
        !this.validationPass.hasErrors &&
        !this.validationLogin.hasErrors
      );
    },
  },
  methods: {
    ...mapActions(["signUpUser"]),
    async submitForm() {
      try {
        await this.signUpUser(this.formValues);
        //очистка формы
        this.formValues.email = "";
        this.formValues.login = "";
        this.formValues.password = "";
        //редирект на страницу аутентификации
        this.$router.push({
          name: "Login",
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