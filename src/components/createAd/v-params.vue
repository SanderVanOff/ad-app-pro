<template>
  <section class="paramsAd col-6">
    <!--condition-->
    <div class="form-control mb-3">
      <label class="fw-bold me-2 mb-2">Состояние:</label>
      <FormulateInput
        v-model="condition"
        name="condition"
        :options="{ use: 'б/у', new: 'новый' }"
        type="radio"
      />
    </div>

    <!-- title and description-->
    <div class="form-control mb-3">
      <!--title-->
      <FormulateInput
        type="text"
        name="title"
        v-model="title"
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
      />
      <!--description-->
      <FormulateInput
        type="textarea"
        name="description"
        v-model="description"
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
      />
    </div>
    <!-- cost-->
    <div class="form-control mb-3">
      <FormulateInput
        type="text"
        name="cost"
        validation-name="Стоимость"
        v-model.number="cost"
        help="Во сколько оцениваете? Только честно"
        validation="required|number"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Стоимость:"
        error-behavior="value"
      />
    </div>

    <!-- city-->
    <div class="form-control mb-3">
      <FormulateInput
        type="text"
        name="city"
        validation-name="Местонахождение"
        v-model="city"
        help="Где находится?"
        validation="required"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Местонахождение:"
        error-behavior="value"
        @validation="validationCity = $event"
      />
    </div>

    <!-- city-->
    <div class="form-control mb-3">
      <FormulateInput
        v-model="delivery"
        name="delivery"
        type="checkbox"
        label="Возможна ли доставка?"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "v-params",
  data: () => ({
    condition: "use",
    title: "",
    description: "",
    cost: 0,
    city: "",
    delivery: false,
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

  watch: {
    validationParams() {
      this.validationParams
        ? this.$emit("get-params", {
            condition: this.condition,
            title: this.title,
            description: this.description,
            cost: this.cost,
            city: this.city,
            delivery: this.delivery,
          })
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>