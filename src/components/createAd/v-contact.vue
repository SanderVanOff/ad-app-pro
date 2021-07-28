<template>
  <section class="col-6">
    <h5 class="mb-3">Контактная информация</h5>
    <!-- phone-->
    <div class="form-control mb-3">
      <FormulateInput
        type="tel"
        name="phone"
        validation-name="Номер телефона"
        label="Номер телефона"
        placeholder="укажите ваш сотовый телефон"
        v-model="phone"
        validation="required"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        error-behavior="value"
        @validation="validationPhone = $event"
      />
    </div>
    <!-- communication-->
    <div class="form-control mb-3">
      <FormulateInput
        label="Способ связи:"
        label-class="label-form"
        v-model="communication"
        name="communication"
        :options="{
          onlyMessage: 'Только сообщениями',
          MessageAndPhone: 'По телефону и в сообщениях',
        }"
        type="radio"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "v-contact",
  props: ['ad'],
  data: () => ({
    phone: "",
    communication: "onlyMessage",
    validationPhone: {},

    patternMobile:
      /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g,
  }),

  computed: {
    isContactDone() {
      return !this.validationPhone.hasErrors;
    },
  },

  watch: {
    isContactDone() {
      if (this.isContactDone) {
        this.$emit("get-contact", {
          phone: this.phone,
          communication: this.communication,
        });
      }
    },
  },

  methods: {
    replacePhone() {
      this.phone = this.phone.replace(this.patternMobile, "+7 ($2) $3-$4-$5");
    },
  },
  mounted() {
    this.phone = this.ad.phone;
    this.communication = this.ad.communication;
  }
};
</script>

<style lang="scss" scoped>
</style>