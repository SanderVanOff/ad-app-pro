<template>
  <section class="paramsAd col-6">
    <!--condition-->
    <div class="form-control mb-3">
      <label class="fw-bold me-2 mb-2">Состояние:</label>
      <FormulateInput
        v-model="params.condition"
        name="condition"
        :options="{ use: 'б/у', new: 'новый' }"
        type="radio"
        @input="changeData"
      />
    </div>

    <!-- title and description-->
    <div class="form-control mb-3">
      <!--title-->
      <FormulateInput
        type="text"
        name="title"
        v-model="params.title"
        help="Например, «Диван-кровать Икеа» или «Холодильник Бирюса 110»"
        validation="required"
        validation-name="Название"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Название:"
        error-behavior="value"
        @validation="validationTitle = $event"
        @input="changeData"
      />
      <!--description-->
      <FormulateInput
        type="textarea"
        name="description"
        v-model="params.description"
        resize="none"
        validation="required|min:10,length"
        validation-name="Описание"
        error-behavior="value"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Описание:"
        :help="`Описание должно быть больше 10 символов.`"
        @validation="validationDescription = $event"
        @input="changeData"
      />
    </div>
    <!-- cost-->
    <div class="form-control mb-3">
      <FormulateInput
        type="text"
        name="cost"
        validation-name="Стоимость"
        v-model.number="params.cost"
        help="Во сколько оцениваете? Только честно"
        validation="required|number"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Стоимость:"
        error-behavior="value"
        @input="changeData"
      />
    </div>

    <!-- city-->
    <div class="form-control mb-3">
      <FormulateInput
        type="text"
        name="city"
        validation-name="Местонахождение"
        v-model="params.city"
        help="Где находится?"
        validation="required"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Местонахождение:"
        error-behavior="value"
        @validation="validationCity = $event"
        @input="changeData"
      />
    </div>

    <!-- city-->
    <div class="form-control mb-3">
      <FormulateInput
        v-model="params.delivery"
        name="delivery"
        type="checkbox"
        label="Возможна ли доставка?"
        @input="changeData"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "v-params",
  props: ["ad"],
  data: () => ({
    loading: false,
    params: {
      condition: "use",
      title: "",
      description: "",
      cost: 0,
      city: "",
      delivery: false,
    },
    //validation
    validationTitle: {},
    validationDescription: {},
    validationCity: {},
  }),
  computed: {
    validationParams() {
      return (
        !this.validationTitle.hasErrors &&
        !this.validationDescription.hasErrors &&
        !this.validationCity.hasErrors
      );
    },
  },

  methods: {
    changeData() {
      this.$emit("get-params", this.params);
    },
  },

  watch: {
    validationParams() {
      if (this.validationParams) this.$emit("done-params");
    },
  },
  mounted() {
    if (this.ad) {
      this.params.title = this.ad.title;
      this.params.condition = this.ad.condition;
      this.params.description = this.ad.description;
      this.params.cost = this.ad.cost;
      this.params.city = this.ad.city;
      this.params.delivery = this.ad.delivery;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>