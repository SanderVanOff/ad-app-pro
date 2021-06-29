<template>
  <section class="paramsAd col-6">
    <!--condition-->
    <div class="form-control mb-3">
      <label class="fw-bold me-2 mb-2">Состояние:</label>
      <FormulateInput
        v-model="condition"
        :options="{ use: 'б/у', new: 'новый' }"
        type="radio"
      />
    </div>
   
 <!-- title and description-->
    <div class="form-control mb-3">
     <!--title-->
      <FormulateInput
        type="text"
        name="Название"
        v-model="title"
        help="Например, «Диван-кровать Икеа» или «Холодильник Бирюса 110»"
        validation="required"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Название:"
        error-behavior="live"
      />
      <!--description-->
      <FormulateInput
        type="textarea"
        v-model="description"
        resize="none"
        validation="required|min:10,length"
        validation-name="Описание"
        error-behavior="live"
        input-is-valid-class="is-valid"
        input-hasErrors-class="is-invalid"
        label-is-valid-class="valid-label"
        label-class="label-form"
        label="Описание:"
        
        :help="`Описание должно быть больше 10 символов.`"
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
    description: ""

  }),
};
</script>

<style lang="scss" scoped>
</style>