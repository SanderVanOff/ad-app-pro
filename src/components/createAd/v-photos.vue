<template>
  <section>
    <h5 class="mb-3">{{$route.name === 'EditAd' ? "Отредактируйте фото": "Добавьте фото"}}
    <small class="mb-3 text-muted">(c фото ваше объявление будет заметнее)</small>
    </h5>
    
    <input
      class="form-control d-none"
      type="file"
      id="formFileMultiple"
      multiple
      @change="loadImage"
      ref="inputImgFile"
    />
    <div class="create-add-form__images mb-3">
      <button
        type="button"
        class="btn btn-outline-dark btn-add-photo me-2 mb-2"
        @click="alertInputFile"
      >
        <i class="fas fa-camera-retro fs-1"></i>
      </button>
      <span
        class="form-added-image-wrapper position-relative"
        v-for="(img, i) of imagesData.images"
        :key="img"
      >
        <button
          type="button"
          class="btn-close position-absolute top-minus-5 right-1"
          @click="removeImg(i)"
          aria-label="Close"
        ></button>
        <img
          :src="img"
          class="rounded form-added-images me-2 mb-2 cursor-pointer"
          @click="choiceMainImg(i)"
          :class="{
            'border border-success border-3': defaultMainImage === i,
          }"
        />
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: "v-photos",
  props: ['ad'],
  data: () => ({
    defaultMainImage: 0,
    imagesData: {
      mainImage: 0,
      images: [],
      imagesFiles: [],
    },
  }),

  computed: {
    title() {
      return this.$route.name
    }
  },

  methods: {
    alertInputFile() {
      this.$refs.inputImgFile.click();
    },

    loadImage() {
      this.$refs.inputImgFile.files.forEach((file, i) => {
      
        this.imagesData.imagesFiles.push(file);
        let urlImg = URL.createObjectURL(this.$refs.inputImgFile.files[i]);
        this.imagesData.images.push(urlImg);
      });
    },

    choiceMainImg(i) {
      this.imagesData.mainImage = i;
      this.defaultMainImage = i;
    },

    removeImg(i) {
      this.imagesData.images.splice(i, 1);
      if (this.imagesData.imagesFiles.length !== 0) this.imagesData.imagesFiles.splice(i, 1);
    },
  },

  mounted(){
      this.$emit('done');
      if(this.ad) {
        this.imagesData.images = this.ad.images;
      }
      
  },

  updated(){
      this.$emit('get-photos', this.imagesData)
  }
};
</script>

<style lang="scss" scoped>
.form-added-images {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.btn-add-photo {
  width: 200px;
  height: 200px;
}
</style>